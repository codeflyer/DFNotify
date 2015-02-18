var path = require('path');
var connectionManager = require('connection-store');
var MessageManager = require('../../lib/business/MessageManager');
var MessageFilter = require('../../lib/business/MessageFilter');

describe('MessageManager countMessages', function() {

  before(function(done) {
    require('readyness').doWhen(done);
  });

  beforeEach(function(done) {
    var fixtures = connectionManager.getConnection('fixtures');
    connectionManager.getConnection().dropDatabase(function(err) {
      fixtures.load(path.join(__dirname, '..', 'fixtures'), done);
    });
  });

  it('Count all', function(done) {
    MessageManager.countMessages({}).then(
        function(result) {
          result.should.be.equal(4);
          done();
        }
    ).catch(function(err) {
          done(err);
        }
    );
  });

  it('Count all for user', function(done) {
    var messageFilter = new MessageFilter();
    messageFilter.user(1);
    MessageManager.countMessages(messageFilter.getFilter()).then(
        function(result) {
          result.should.be.equal(3);
          done();
        }
    ).catch(function(err) {
          done(err);
        }
    );
  });

  it('Count all for user 2', function(done) {
    var messageFilter = new MessageFilter();
    messageFilter.user(2);
    MessageManager.countMessages(messageFilter.getFilter()).then(
        function(result) {
          result.should.be.equal(1);
          done();
        }
    ).catch(function(err) {
          done(err);
        }
    );
  });
});
