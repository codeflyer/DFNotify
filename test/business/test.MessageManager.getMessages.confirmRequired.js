var path = require('path');
var connectionManager = require('connection-store');
var MessageManager = require('../../lib/business/MessageManager');
var MessageFilter = require('../../lib/business/MessageFilter');
var ObjectID = require('mongodb').ObjectID;
var moduleEntryPoint = require('../../lib/index');

describe('MessageManager getMessages confirm required', function() {

  before(function(done) {
    require('readyness').doWhen(done);
  });

  beforeEach(function(done) {
    var fixtures = connectionManager.getConnection('fixtures');
    connectionManager.getConnection().dropDatabase(function(err) {
      fixtures.load(path.join(__dirname, '..', 'fixtures'), done);
    });
  });

  it('Check confirm required', function(done) {
    var messageFilter = new MessageFilter();
    messageFilter
        .user(1)
        .isConfirmRequired();
    MessageManager.getMessages(
        messageFilter.getFilter()
    ).then(
        function(result) {
          result.length.should.be.equal(1);
          var ids = [
            ObjectID.createFromTime(2).toString()
          ];
          ids.indexOf(result[0].getId()).should.not.be.equal(-1);
          done();
        }
    ).catch(function(err) {
          done(err);
        }
    );
  });

  it('Check not confirm required', function(done) {
    var messageFilter = new MessageFilter();
    messageFilter
        .user(1)
        .isNotConfirmRequired();
    MessageManager.getMessages(
        messageFilter.getFilter()
    ).then(
        function(result) {
          result.length.should.be.equal(2);
          var ids = [
              ObjectID.createFromTime(1).toString(),
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

  it('Check NOT confirm required AND Noviewed', function(done) {
    var messageFilter = new MessageFilter();
    messageFilter
        .user(1)
        .isNotConfirmRequired()
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
});
