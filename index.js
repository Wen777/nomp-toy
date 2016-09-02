require('babel-register');

const models = require('./models');
const app = require('./server');
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/config/api.json')[env];


models.sequelize.sync().then(function() {
  app.listen(config.port, config.host, function() {
    console.log('Server listening on %s:%d', config.host, config.port);
  });
});
