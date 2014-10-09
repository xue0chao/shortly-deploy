var db = require('../config');
var crypto = require('crypto');
var _ = require('../../public/lib/underscore')

var Link = db.mongoose.model('Link', db.urls);

_.extend(Link, {
  // tableName: 'urls',
  // hasTimestamps: true,
  initialize: function(model){
    var shasum = crypto.createHash('sha1');
    shasum.update(model.url);
    model.code = shasum.digest('hex').slice(0, 5);
  }
});

module.exports = Link;
