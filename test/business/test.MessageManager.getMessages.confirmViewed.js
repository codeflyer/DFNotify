var path = require('path');
var connectionManager = require('../connectionManager');
var MessageManager = require('../../lib/business/MessageManager');
var MessageFilter = require('../../lib/business/MessageFilter');
var ObjectID = require('mongodb').ObjectID;
var moduleEntryPoint = require('../../lib/index');

describe('MessageManager getMessages confirmViewed', function() {

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

  it('Check confirmViewed', function(done) {
    var messageFilter = new MessageFilter();
    messageFilter
        .user(1)
        .isConfirmViewed();
    MessageManager.getMessages(
        messageFilter.getFilter()
    ).then(
        function(result) {
          result.length.should.be.equal(1);
          var ids = [
            ObjectID.createFromTime(1).toString(),
          ];
          ids.indexOf(result[0].getId()).should.not.be.equal(-1);
          done();
        }
    ).catch(function(err) {
          done(err);
        }
    );
  });

  it('Check not confirmViewed', function(done) {
    var messageFilter = new MessageFilter();
    messageFilter
        .user(1)
        .isNotConfirmViewed();
    MessageManager.getMessages(
        messageFilter.getFilter()
    ).then(
        function(result) {
          result.length.should.be.equal(2);
          var ids = [
              ObjectID.createFromTime(2).toString(),
              ObjectID.createFromTime(3).toString()
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
});
