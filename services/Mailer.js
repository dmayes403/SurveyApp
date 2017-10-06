const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        // ^^ curly braces because of destructoring off of survey object
        super();
        // ^^ this executes everything in the helper constructor

        this.email_from = new helper.Email('no-reply@surveyApp.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            // ^^ destructoring, paranthesis are needed
            return new helper.Email(email);
        });
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings = setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

}

module.exports = Mailer;