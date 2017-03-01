/**
 * Created by hungtruong on 2/22/17.
 */
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Customers} = require('./db/customers');
var {Orders} = require('./db/orders');

const app = express();

app.use(bodyParser.json());

app.post('/customers', function(request, response) {
    console.log(request.body);
    let customer = new Customers(request.body);
    customer.save().then((doc) => {
        response.send(doc);
    }, (e) => {
        response.status(400).send(e);
    });
});

app.get('/customers', (request, response) => {
    Customers.find().then((customers) => {
        response.send({customers: customers});
    }, (error) => {
        response.status(400).send(error);
    });
});

app.get('/', function(request, response) {
    response.send('Test data');
});

app.listen(3000, function() {
    console.log('Start listening on 3000');
});

module.exports = {app};