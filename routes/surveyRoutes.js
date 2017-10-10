const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
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
        mailer.send();
        // ^^ working on fixing API
    });
};