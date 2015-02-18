var path = require('path');
var connectionManager = require('connection-store');
var MessageManager = require('../../lib/business/MessageManager');
var MessageFilter = require('../../lib/business/MessageFilter');
var moduleEntryPoint = require('../../lib/index');

describe('MessageManager getMessages', function() {

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
    MessageManager.getMessages({}).then(
        function(result) {
          result.length.should.be.equal(4);
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
    MessageManager.getMessages(messageFilter.getFilter()).then(
        function(result) {
          result.length.should.be.equal(3);
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
    MessageManager.getMessages(messageFilter.getFilter()).then(
        function(result) {
          result.length.should.be.equal(1);
          done();
        }
    ).catch(function(err) {
          done(err);
        }
    );
  });
});
