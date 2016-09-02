require('babel-register');
require('should');
const request = require('supertest');

const server = request.agent("http://localhost:3000");

describe('GET /ping', function() {
  it('respond with json', function(done) {
    server
      .get('/v1/ping')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
