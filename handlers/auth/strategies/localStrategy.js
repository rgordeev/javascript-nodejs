var User = require('users').User;

const LocalStrategy = require('passport-local').Strategy;
const co = require('co');

function UserAuthError(message) {
  this.message = message;
}


// done(null, user)
// OR
// done(null, false, { message: <error message> })  <- 3rd arg format is from built-in messages of strategies
module.exports = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, done) {

  co(function*() {

    // @tyv UNCOMMENT SPINNER
    // yield function(callback) {};

    if (!email) throw new UserAuthError('Укажите email.');
    if (!password) throw new UserAuthError('Укажите пароль.');

    var user = yield User.findOne({email: email}).exec();

    if (!user) {
      throw new UserAuthError('Нет такого пользователя.');
    }

    if (!user.checkPassword(password)) {
      throw new UserAuthError('Пароль неверен.');
    }

    if (!user.verifiedEmail) {
      throw new UserAuthError('Ваш email не подтверждён, проверьте почту. Также можно <a href="#" data-action-verify-email="' + user.email + '">запросить подтверждение заново</a>.');
    }

    return user;
  }).then(function(user) {
    done(null, user);
  }, function(err) {
    if (err instanceof UserAuthError) {
      done(null, false, {message: err.message});
    } else {
      done(err);
    }
  });

});
