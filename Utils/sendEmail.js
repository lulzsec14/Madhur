const nodemailer = require('nodemailer');
const sgmail = require('@sendgrid/mail');

const sendEmail = (options) => {
  sgmail.setApiKey(process.env.EMAIL_PASSWORD);
  const msg = {
    to: options.to,
    from: process.env.EMAIL_FROM,
    subject: options.subject,
    html: options.text,
  };

  (async () => {
    try {
      await sgmail.send(msg);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();
};

module.exports = sendEmail;
