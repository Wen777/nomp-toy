'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Midleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routers
// Set up route

// Template engine
// app.set('view engine', 'pug');
// app.set('views', './views');

// Add headers
app.use(function(req, res, next) {
  if (process.env.NODE_ENV !== 'production') {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // Pass to next layer of middleware
  }
  next();
});

app.get('/v1/ping', function(req, res) {
    res.status(200).json({'res': 'PONG!'});
});

// export default app;
module.exports = app;
