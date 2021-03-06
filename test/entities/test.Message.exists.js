var path = require('path');
var connectionManager = require('connection-store');
var Factory = require('entityx').Factory;
var ObjectID = require('mongodb').ObjectID;
var moduleEntryPoint = require('../../lib/index');

describe('Message entity exists', function() {

  before(function(done) {
    require('readyness').doWhen(done);
  });

  beforeEach(function(done) {
    var fixtures = connectionManager.getConnection('fixtures');
    connectionManager.getConnection().dropDatabase(function(err) {
      fixtures.load(path.join(__dirname, '..', 'fixtures'), done);
    });
  });

  it('Should exists', function(done) {
    var model = Factory.getEntity('DFNotify/Message',
        ObjectID.createFromTime(1).toString());
    model.exists().then(
        function(result) {
          result.should.be.true;
          done();
        }
    ).catch(function(err) {
          done(err);
        }
    );
  });

  it('Should NOT exists', function(done) {
    var model = Factory.getEntity('DFNotify/Message',
        ObjectID.createFromTime(10).toString());
    model.exists().then(
        function(result) {
          result.should.be.false;
          done();
        }
    ).catch(function(err) {
          done(err);
        }
    );
  });
});
