const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
  });
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
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

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save(); // saves user to db and returns it

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    console.log(req.body);

    res.send({});
  });
};
