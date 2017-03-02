/**
 * Created by hungtruong on 2/22/17.
 */
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};

