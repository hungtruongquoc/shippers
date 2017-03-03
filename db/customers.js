/**
 * Created by hungtruong on 2/22/17.
 */
let mongoose = require('mongoose');

let Customers = mongoose.model('Customers', {
  name: {
    type: String,
    required: true
  }
});

module.exports = {Customers};
