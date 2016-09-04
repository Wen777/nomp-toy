require('babel-register');
require('should');

const request = require('supertest');
const db = require('../../models');
const server = request.agent('http://localhost:3000');

describe('[Pool]', function() {
  before(function(done) {
    db.sequelize.sync({force: true})
      .then(function() {done();});
  });

  describe('POST /v1/pool', function() {
    it('respond with success information', function(done) {
      const postData = {
        'endpoint': '104.236.155.198:3008',
        'host': '104.236.155.198',
        'port': '3008',
        'coin': 'litecoin',
        'description': 'A testing mining pool.'
      };

      server
            .post('/v1/pool')
            .send(postData)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              const response = res.body;
              res.status.should.equal(200);
              response.error.should.equal(false);
              done();
            });
    });
  });

  describe('GET /v1/pool?coin=litecoin', function() {
    it('respond with Array<Object>', function(done) {
      server
            .get('/v1/pool?coin=litecoin')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              res.status.should.equal(200);
              res.body.error.should.equal(false);
              const poolArr = res.body.data;
              poolArr[0].endpoint
                    .should.be.a.String().and.match(/^stratum\+tcp\:\/\//g);
              done();
            });
    });
  });
});
