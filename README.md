# tenthousand
The official code base for 10,000 over Iowa

Server-Side
=========
A simple server for serving files and responding to api calls for 10,000 over Iowa

## Usage
node our_server.js

open http://localhost:8080/static/index.html in a browser


Engine
=========

A library providing server utilities for 10,000 over Iowa's backend server

## Usage

  var engine = require('our_engine')
      currentTimeString = engine.get_time();

  console.log(currentTimeString);

## Tests

  npm test

## Release History

* 0.1.0 Milestone 1 release

## Helpful resources

### Creating and publishing a node.js module
https://quickleft.com/blog/creating-and-publishing-a-node-js-module/

### Chai assertion library
http://chaijs.com/api/bdd/
