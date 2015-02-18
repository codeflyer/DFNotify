process.env.NODE_CONFIG_PERSIST_ON_CHANGE = 'N';
process.env.NODE_ENV = 'test';

var path = require('path');
var rootPath = path.join(__dirname, '../', '/');
global.ROOT_PATH_FOR_TEST = rootPath;

require('should');

var config = require('config');

var connectionManager = require('connection-store');

var ready = require('readyness');
var MongoClient = require('mongodb').MongoClient;
var fixtureConnected = ready.waitFor('fixtureDbOk');
MongoClient.connect(
    'mongodb://' +
    config.mongodb.host + ':' +
    config.mongodb.port + '/' +
    config.mongodb.db, function(err, db) {
      if (err) {
        throw err;
      }
      connectionManager.addConnection(db);
      //require('../lib/index').setMongoDbConnection(connectionManager.getConnection());
      var fixtures = require('pow-mongodb-fixtures').connect(config.mongodb.db);
      connectionManager.addConnection('fixtures', fixtures);
      fixtureConnected();
    });
