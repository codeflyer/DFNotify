var path = require('path');
var connectionManager = require('../connectionManager');
var Factory = require('entityx').Factory;
var moduleEntryPoint = require('../../lib/index');

describe('MessageDriver init', function() {

  before(function(done) {
    require('readyness').doWhen(done);
  });

  beforeEach(function(done) {
    moduleEntryPoint.setMongoDbConnection(connectionManager.getConnection());
    var fixtures = connectionManager.getFixtures();
    fixtures.clear(function(err) {
      fixtures.load(path.join(__dirname, '..', 'fixtures'), done);
    });
  });

  it('Should get instance of driver', function(done) {
    Factory.getRepository('DFNotify/Message');
    done();
  });
});
