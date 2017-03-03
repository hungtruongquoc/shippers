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

describe('DELETE /customers/:id', () => {
  it('should remove a customer with provided id', (done) => {
    request(app).delete(`/customers/${customerList[0]._id.toHexString()}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.customer.name).toBe(customerList[0].name);
      })
      .end((error, response) => {
        if (error) {
          return done(error);
        }
        Customers.findById(customerList[0]._id.toHexString()).then((customer) => {
          expect(customer).toNotExist();
          done();
        }).catch((error) => {
          done(error);
        });
      });
  });
  it('should get an undefined value with provided id but such customer does not exist',
    (done) => {
      request(app).delete(`/customers/${(new ObjectID).toHexString()}`)
        .expect(400)
        .expect((response) => {
          expect(response.body.customer).toBe(undefined);
        })
        .end(done);
    });
  it('should get an undefined value with wrong id',
    (done) => {
      request(app).delete('/customers/1234568')
        .expect(400)
        .expect((response) => {
          expect(response.body.customer).toBe(undefined);
        })
        .end(done);
    });
});

describe('PATCH /customers/:id', () => {
  it('should update a customer with provided id', (done) => {
    let newName = 'Test patch';
    request(app).patch(`/customers/${customerList[0]._id.toHexString()}`)
      .send({name: newName})
      .expect(200)
      .expect((response) => {
        expect(response.body.customer.name).toBe(newName);
      })
      .end(done);
  });
  it('should get an undefined value with provided id but such customer does not exist',
    (done) => {
      request(app).patch(`/customers/${(new ObjectID).toHexString()}`)
        .expect(400)
        .expect((response) => {
          expect(response.body.customer).toBe(undefined);
        })
        .end(done);
    });
  it('should get an undefined value with wrong id',
    (done) => {
      request(app).patch('/customers/1234568')
        .expect(400)
        .expect((response) => {
          expect(response.body.customer).toBe(undefined);
        })
        .end(done);
    });
});

describe('POST /users', () => {
  it('should create a new users', (done) => {
    let name = 'test';
    request(app).post('/users').send({name: name})
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

  it('should not create a user with invalid data', (done) => {
    request(app).post('/users').send({})
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
