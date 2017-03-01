/**
 * Created by hungtruong on 2/28/17.
 */
const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Customers} = require('./../db/customers');

beforeEach((done) => {
   Customers.remove({}).then(() => done());
});

describe('POST /customers', () => {
    it('should create a new customer', (done) => {
        let name = 'test';
        request(app).post('/customers').send({name: name})
            .expect(200)
            .expect((response) => {
                expect(response.body.name).toBe(name);
            }).end((error, response) => {
            if(error) {
                return done(error);
            }

            Customers.find().then((customers) => {
                expect(customers.length).toBe(1);
                expect(customers[0].name).toBe(name);
                done();
            }).catch((e) => done(e));
        });
    });

    it('should not create a customer with invalid data', (done) => {
        request(app).post('/customers').send({})
            .expect(400).end((error, response) => {

            if(error) {
                return done(error);
            }

            Customers.find().then((customers) => {
                expect(customers.length).toBe(0);
                done();
            }).catch((error) => done(error));
        })
    });
});