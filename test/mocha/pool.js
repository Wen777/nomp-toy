require('babel-register');
require('should');

const db = require('../../models');

describe('[Pool] CRUD', function() {
  before(function(done) {
    db.sequelize.sync({force: true})
      .then(function() {done();});
  });

  describe('Insert a new record of pool table', function() {
    it('respond with success information', function() {
      const data = {
        'endpoint': '104.236.155.198:3008',
        'host': '104.236.155.198',
        'port': '3008',
        'coin': 'litecoin',
        'description': 'A testing mining pool.'
      };

      return db.Pool.addPool(data).should.be.fulfilled();
    });
  });

  describe('Query from pool table', function() {
    it('respond with Array<Object>', function() {
      const data = {'coin': 'litecoin'};

      return db.Pool.queryPools(data)
            .then(function(it) {
              it.should.be.an.Array();
              it[0].should.be.an.Object();
            })
            .should.be.fulfilled();
    });
  });
});
