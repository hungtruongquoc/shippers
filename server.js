/**
 * Created by hungtruong on 2/22/17.
 */
require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

let {mongoose} = require('./db/mongoose');
let {Customers} = require('./db/customers');
let {Orders} = require('./db/orders');

const app = express();

// Sets up port for the app
const port = process.env.PORT || 3000;

app.use(bodyParser.json());


app.patch('/customers/:id', (request, response) => {
    let customerId = request.params.id;
    // If the id is valid
    if (ObjectID.isValid(customerId)) {
        // Queries and updates customer
        Customers.findByIdAndUpdate(customerId, {
            $set: {name: request.body.name}
        }, {new: true}).then((customer) => {
            if (customer) {
                response.send({customer})
            }
            else {
                response.status(400).send();
            }
        }).catch((error) => {
            response.status(400).send();
        });
    }
    else {
        // Else stops execution and return null
        return response.status(400).send();
    }
});

app.delete('/customers/:id', (request, response) => {
    let customerId = request.params.id;
    // If the id is valid
    if (ObjectID.isValid(customerId)) {
        // Queries and deletes the customer with provided id
        Customers.findByIdAndRemove(customerId).then((customer) => {
            // Success
            // If such customer exists, sends the customer object back
            if (customer) {
                response.send({customer: customer});
            }
            else {
                // Else no customer with provided id exists,
                // sends the 400 status and null object
                response.status(400).send();
            }
        }, (error) => {
            // Error
            // Return a 400 and send back null
            response.status(400).send();
        }).catch((error) => {
            response.status(400).send();
        });
    }
    else {
        // Else stops execution and return null
        return response.status(400).send();
    }
});

app.get('/customers/:id', (request, response) => {
    let customerId = request.params.id;
    // If the id is valid
    if (ObjectID.isValid(customerId)) {
        // Queries the customer with provided id
        Customers.findById(customerId).then((customer) => {
            // Success
            // If such customer exists, sends the customer object back
            if (customer) {
                response.send({customer: customer});
            }
            else {
                // Else no customer with provided id exists,
                // sends the 400 status and null object
                response.status(400).send();
            }
        }, (error) => {
            // Error
            // Return a 400 and send back null
            response.status(400).send();
        });
    }
    else {
        // Else stops execution and return null
        return response.status(400).send();
    }
});

app.post('/customers', function (request, response) {
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

app.get('/', function (request, response) {
    response.send('Test data');
});

app.listen(port, function () {
    console.log(`Start listening on ${port}`);
});

module.exports = {app};