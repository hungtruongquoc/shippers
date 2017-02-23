/**
 * Created by hungtruong on 2/22/17.
 */
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Shippers');

module.exports = {mongoose};