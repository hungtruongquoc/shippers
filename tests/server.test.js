/**
 * Created by hungtruong on 2/28/17.
 */
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Customers} = require('./../db/customers');

const customerList = [
    {_id: new ObjectID(), name: 'abc'},
    {_id: new ObjectID(), name: 'cdc'}
];

beforeEach((done) => {
    Customers.remove({}).then(() => {
        return Customers.insertMany(customerList);
    }).then(() => done());
});

describe('POST /customers', () => {
    it('should create a new customer', (done) => {
        let name = 'test';
        request(app).post('/customers').send({name: name})
            .expect(200)
            .expect((response) => {
                expect(response.body.name).toBe(name);
            }).end((error, response) => {
            if (error) {
                return done(error);
            }

            Customers.find({name: name}).then((customers) => {
                expect(customers.length).toBe(1);
                expect(customers[0].name).toBe(name);
                done();
            }).catch((e) => done(e));
        });
    });

    it('should not create a customer with invalid data', (done) => {
        request(app).post('/customers').send({})
            .expect(400).end((error, response) => {

            if (error) {
                return done(error);
            }

            Customers.find().then((customers) => {
                expect(customers.length).toBe(2);
                done();
            }).catch((error) => done(error));
        })
    });
});

describe('GET /customers', () => {
    it('should get all customers', (done) => {
        request(app).get('/customers')
            .expect(200)
            .expect((response) => {
                expect(response.body.customers.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /customers/:id', () => {
    it('should get a customer with provided id', (done) => {
        request(app).get(`/customers/${customerList[0]._id.toHexString()}`)
            .expect(200)
            .expect((response) => {
                expect(response.body.customer.name).toBe(customerList[0].name);
            })
            .end(done);
    });
    it('should get an undefined value with provided id but such customer does not exist',
        (done) => {
            request(app).get(`/customers/${(new ObjectID).toHexString()}`)
                .expect(400)
                .expect((response) => {
                    expect(response.body.customer).toBe(undefined);
                })
                .end(done);
        });
    it('should get an undefined value with wrong id',
        (done) => {
            request(app).get('/customers/1234568')
                .expect(400)
                .expect((response) => {
                    expect(response.body.customer).toBe(undefined);
                })
                .end(done);
        });
});