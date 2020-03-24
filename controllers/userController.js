const account = require('./account/lib');

module.exports = app => {
  app.post('/login', account.login);
  app.post('/signup', account.signup);
}