var path = require('path');
var connectionManager = require('../connectionManager');
var MessageManager = require('../../lib/business/MessageManager');
var MessageFilter = require('../../lib/business/MessageFilter');
var ObjectID = require('mongodb').ObjectID;
var moduleEntryPoint = require('../../lib/index');

describe('MessageManager getMessages viewed', function() {

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

  it('Check view', function(done) {
    var messageFilter = new MessageFilter();
    messageFilter
        .user(1)
        .isViewed();
    MessageManager.getMessages(
        messageFilter.getFilter()
    ).then(
        function(result) {
          result.length.should.be.equal(2);
          var ids = [
            ObjectID.createFromTime(1).toString(),
            ObjectID.createFromTime(2).toString(),
          ];
          ids.indexOf(result[0].getId()).should.not.be.equal(-1);
          ids.indexOf(result[1].getId()).should.not.be.equal(-1);
          ids.indexOf(result[0].getId()).should.not.be.equal(
              ids.indexOf(result[1].getId())
          );
          done();
        }
    ).catch(function(err) {
          done(err);
        }
    );
  });

  it('Check not view', function(done) {
    var messageFilter = new MessageFilter();
    messageFilter
        .user(1)
        .isNotViewed();
    MessageManager.getMessages(
        messageFilter.getFilter()
    ).then(
        function(result) {
          result.length.should.be.equal(1);
          var ids = [
              ObjectID.createFromTime(3).toString()
          ];
          ids.indexOf(result[0].getId()).should.not.be.equal(-1);
          done();
        }
    ).catch(function(err) {
          done(err);
        }
    );
  });
});
