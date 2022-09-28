
const chai = require('chai');
const request = require('supertest');
const app = require('../app');
const { users } = require('./seed/seed');

const expect = chai.expect;


describe('auth tests', () => {
    describe('successes', () =>{
      it('should login a valid user succesfully', (done) => {
        request(app).post('/api/v1/auth')
          .send(users.validUser)
          .end((err, res) => {
            if (err) done(err);
  
            expect(res.body).to.be.an('object').that.has.keys(['success', 'code', 'message','data']);
            expect(res.body.success).to.be.equal(true);
            expect(res.body.code).to.be.equal(200);
            expect(res.body.message).to.be.equal('user logged in');
            expect(res.body.data).to.be.an('object').that.has.keys(['token']);
            done();
          });
    })

    it('should load a successful users details', (done) => {
        request(app).get('/api/v1/auth')
          .set( "Authorization", `Bearer ${process.env.DEMO_TOKEN}`)
          .send(users.validUser)
          .end((err, res) => {
            if (err) done(err);
  
            expect(res.body).to.be.an('object').that.has.keys(['success', 'code', 'message','data']);
            expect(res.body.success).to.be.equal(true);
            expect(res.body.code).to.be.equal(200);
            expect(res.body.message).to.be.equal('Success');
            expect(res.body.data).to.be.equal(`logged in as: ${users.validUser.username}`);
            done();
          });
    })
  })
  
    describe('errors', () => {
      it('should return errors if password is wrong', (done) => {
        request(app).post('/api/v1/auth')
          .send(users.validUserInvalidPass)
          .end((err, res) => {
            if (err) done(err);
  
            expect(res.body).to.be.an('object').that.has.keys(['success', 'code', 'message','data']);
            expect(res.body.success).to.be.equal(false);
            expect(res.body.code).to.be.equal(400);
            expect(res.body.message).to.be.equal('incorrect password');
            expect(res.body.data).to.be.equal(null);
            done();
          });
    })

    it('should return errors if user does not exist', (done) => {
      request(app).post('/api/v1/auth')
        .send(users.invalidUser)
        .end((err, res) => {
          if (err) done(err);

          expect(res.body).to.be.an('object').that.has.keys(['success', 'code', 'message','data']);
          expect(res.body.success).to.be.equal(false);
          expect(res.body.code).to.be.equal(404);
          expect(res.body.message).to.be.equal('user does not exist');
          expect(res.body.data).to.be.equal(null);
          done();
        });
  })
  })
  });