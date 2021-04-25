/* eslint-disable no-console */
function authenticate(req, res, next) {
  console.log('Authentication Middleware is Excetuing.....');
  next();
}

module.exports = authenticate;
