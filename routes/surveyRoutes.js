const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');
// ^^ this is the Survey model class

module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
        // ***** do the requireLogin type logic for determining login privileges in movie app
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false });
            // ^^ this means don't include recipients property in query. Cuts down on data sent back
        res.send(surveys);
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const {title, subject, body, recipients} = req.body;

        const survey = new Survey({
            // title: title
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email =>  ({ email: email.trim() })),
            // this returns an array of objects [{}], it's wrapped in paranthesis so that
            // it knows to return an object, instead of just returning as usual
            _user: req.user.id,
            dateSent: Date.now()
        });

        const mailer = new Mailer(survey, surveyTemplate(survey));
        // ^^ creating a new instance of the mailer class
        try {
            await mailer.send();
            // ^^ send function inside of mailer.js must also be labeled async
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
            // ^^ after saving, send back the new user
        } catch (err) {
            res.status(422).send(err);
        }
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');
        // videos 175+ for this filtering
        // const events = _.map(req.body, (event) => {
        _.chain(req.body)
            .map(({ email, url }) => {
                const match = p.test(new URL(url).pathname);
                // ^^ this returns an object if both parameters are found
                if (match) {
                    // return { email: event.email, surveyId: match.surveyId, choice: match.choice };
                    return { email, surveyId: match.surveyId, choice: match.choice };
                }
            })
            .compact()
            .uniqBy( 'email', 'surveyId')
            .each(({ surveyId, email, choice}) => {
                // ^^ destructuring off of event
                Survey.updateOne({
                    _id: surveyId,
                    // ^^ mongo uses _id, not just id
                    recipients: {
                        $elemMatch: { email: email, responded: false }
                    }
                    // ^^ find the record that matches these requirements
                }, {
                    $inc: { [choice] : 1 },
                    // ^^ whatever the choice is of the found record, update the survey count of that choice by 1
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                    // ^^ then update the current found recipients recorded responded property to true
                }).exec();
                // ^^ this executes the query
            })
            .value();

        res.send({});
    });
};