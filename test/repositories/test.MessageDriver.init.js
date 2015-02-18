var path = require('path');
var connectionManager = require('connection-store');
var Factory = require('entityx').Factory;
var moduleEntryPoint = require('../../lib/index');

describe('MessageDriver init', function() {

  before(function(done) {
    require('readyness').doWhen(done);
  });

  beforeEach(function(done) {
    var fixtures = connectionManager.getConnection('fixtures');
    connectionManager.getConnection().dropDatabase(function(err) {
      fixtures.load(path.join(__dirname, '..', 'fixtures'), done);
    });
  });

  it('Should get instance of driver', function(done) {
    Factory.getRepository('DFNotify/Message');
    done();
  });
});
