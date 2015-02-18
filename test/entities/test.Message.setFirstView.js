var path = require('path');
var connectionManager = require('connection-store');
var Factory = require('entityx').Factory;
var ObjectID = require('mongodb').ObjectID;
var moduleEntryPoint = require('../../lib/index');

describe('Message entity setFirstView', function() {

  before(function(done) {
    require('readyness').doWhen(done);
  });

  beforeEach(function(done) {
    var fixtures = connectionManager.getConnection('fixtures');
    connectionManager.getConnection().dropDatabase(function(err) {
      fixtures.load(path.join(__dirname, '..', 'fixtures'), done);
    });
  });

  it('Entity load', function(done) {
    var model = Factory.getEntity('DFNotify/Message',
        ObjectID.createFromTime(3).toString());
    model.load().then(
        function(result) {
          var date = new Date();
          return model.updateFirstView(date);
        }
    ).then(function() {
          done();
        }
    ).catch(function(err) {
          done(err);
        }
    );
  });
});
