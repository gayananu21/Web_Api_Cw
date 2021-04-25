/* eslint-disable no-console */
function sendEmail(req, res, next) {
  console.log('Email Sending Middleware is Excetuing.....');
  next();
}

module.exports = sendEmail;
