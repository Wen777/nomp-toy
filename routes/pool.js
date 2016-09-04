const express = require('express');
const Router = express.Router();
const db = require('../models');

const generateErrorHandler = function(res) {
  return err => {
    console.error(err);
    res.status(500).json({error: true, data: err.message});
  };
};

Router.route('/v1/pool')

.get(function(req, res) {
  const errorHandler = generateErrorHandler(res);
  const data = {
    coin: req.query.coin
  };

  db.Pool.queryPools(data)
    .then(function(result) {
      res.status(200).json({error: false, data: result});
    })
    .catch(errorHandler);
})

.post(function(req, res) {
  const errorHandler = generateErrorHandler(res);
  db.Pool.addPool(req.body)
    .then(function(data) {
      res.status(200).json({error: false, data: data});
    })
    .catch(errorHandler);
});

module.exports = Router;
