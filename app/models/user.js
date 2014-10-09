var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var _ = require('../../public/lib/underscore');

var User = db.mongoose.model('User', db.users);

_.extend(User, {
  // tableName: 'users',
  // hasTimestamps: true,
  initialize: function(model){
    User.hashPassword(model);
  },
  comparePassword: function(attemptedPassword, callback, model) {
    bcrypt.compare(attemptedPassword, model.password, function(err, isMatch) {
      callback(isMatch);
    });
  },
  hashPassword: function(model){
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(model.password, null, null).bind(this)
      .then(function(hash) {
        model.password = hash;
      });
  }
});

module.exports = User;
