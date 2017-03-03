/**
 * Created by hungtruong on 2/22/17.
 */
let mongoose = require('mongoose');

let Orders = mongoose.model('Orders', {
  items: {
    type: Array,
    required: true
  }
});

module.exports = {Orders};
