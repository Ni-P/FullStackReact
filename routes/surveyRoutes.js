const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;
    console.log(req.body.recipients);

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => {
        return {
          email: email.trim()
          //responded: false
        };
      }),
      _user: req.user.id,
      dateSent: Date.now()
    });

    console.log(survey.recipients);
    const mailer = new Mailer(survey, surveyTemplate(survey));
    mailer.send();
  });
};
