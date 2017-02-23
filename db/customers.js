/**
 * Created by hungtruong on 2/22/17.
 */
var mongoose = require('mongoose');

var Customers = mongoose.model('Customers', {
    name: {
        type: String,
        required: true
    }
});

module.exports = {Customers};