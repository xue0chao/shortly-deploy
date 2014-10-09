var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var _ = require('../../public/lib/underscore');

db.users.methods = {
  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
      callback(isMatch);
    });
  },
};

db.users.pre('save', function(next){
  var cipher = Promise.promisify(bcrypt.hash);
  cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
    })
    .then(next);
});

var User = db.mongoose.model('User', db.users);
module.exports = User;
