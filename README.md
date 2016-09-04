# nomp-toy

[![Build Status](https://travis-ci.org/Wen777/nomp-toy.svg?branch=master)](https://travis-ci.org/Wen777/nomp-toy)

This project is a RESTful api server which integrate with several mining pools.
You can get the information of mining pool from this server.

* Litecoin, [uNOMP](http://104.236.155.198:8880/)
* Ethereum

## Architecture

```
desktop app (miner)
    |
    |             information
back-end server --------------- nomp-toy server
    |                               |
MongoDB                             |---------------------
                                    |GPU mining          |
                                uNOMP (mining pool)   Ethereum mining pool
```

## Init

* DB

```{SQL}
CREATE USER nomp WITH PASSWORD 'nomp';
CREATE DATABASE pool_api_development;
CREATE DATABASE pool_api_test;
GRANT ALL PRIVILEGES ON DATABASE jerry to nomp;
```

* application

`npm install`

## Testing

* Unit test
    `npm test`
* API test

```{shell}
npm run start-test-server
npm run test-api
```

## TODO

* [ ] Auth
* [ ] pm2 for deployment
