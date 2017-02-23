/**
 * Created by hungtruong on 2/22/17.
 */
var mongoose = require('mongoose');

var Customers = mongoose.model('Orders', {
    items: {
        type: Array,
        required: true
    }
});

module.exports = {Customers};