const chai = require('chai');
const request = require('supertest');
const app = require('../app');
const { users } = require('./seed/seed');

const expect = chai.expect;

describe('user tests', () => {
  describe('successes', () =>{
  //   it('should signup a valid user succesfully', (done) => {
  //     request(app).post('/api/v1/users')
  //       .send(users.newUser)
  //       .end((err, res) => {
  //         if (err) done(err);

  //         expect(res.body).to.be.an('object').that.has.keys(['success', 'code', 'message','data']);
  //         expect(res.body.success).to.be.equal(true);
  //         expect(res.body.code).to.be.equal(201);
  //         expect(res.body.message).to.be.equal('user succesfully registered');
  //         expect(res.body.data).to.be.an('object').that.has.keys(['user']);
  //         done();
  //       });
  // })
})

  describe('errors', () => {
    it('should return errors if no username is supplied', (done) => {
      request(app).post('/api/v1/users')
        .send(users.invalidUserNoName)
        .end((err, res) => {
          if (err) done(err);

          expect(res.body).to.be.an('object').that.has.keys(['success', 'code', 'message','data']);
          expect(res.body.success).to.be.equal(false);
          expect(res.body.code).to.be.equal(400);
          expect(res.body.message).to.be.equal('username is not allowed to be empty');
          expect(res.body.data).to.be.equal(null);
          done();
        });
  })

    it('should return errors if no password is supplied', (done) => {
        request(app).post('/api/v1/users')
          .send(users.invalidUserNoPass)
          .end((err, res) => {
            if (err) done(err);

            expect(res.body).to.be.an('object').that.has.keys(['success', 'code', 'message','data']);
            expect(res.body.success).to.be.equal(false);
            expect(res.body.code).to.be.equal(400);
            expect(res.body.message).to.be.equal('password is not allowed to be empty');
            expect(res.body.data).to.be.equal(null);
            done();
          });
  })
})
});

  