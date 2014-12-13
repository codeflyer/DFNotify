var path = require('path');
var connectionManager = require('../connectionManager');
var MessageManager = require('../../lib/business/MessageManager');
var MessageFilter = require('../../lib/business/MessageFilter');
var ObjectID = require('mongodb').ObjectID;

describe('MessageManager getMessages forDate', function() {

  before(function(done) {
    require('readyness').doWhen(done);
  });

  beforeEach(function(done) {
    var fixtures = connectionManager.getFixtures();
    fixtures.clear(function(err) {
      fixtures.load(path.join(__dirname, '..', 'fixtures'), done);
    });
  });

  it('Check range', function(done) {
    var messageFilter = new MessageFilter();
    messageFilter
        .user(1)
        .today(new Date('2014/12/02'));
    MessageManager.getMessages(
        messageFilter.getFilter()
    ).then(
        function(result) {
          result.length.should.be.equal(1);
          result[0].getId().should.be.equal(
              ObjectID.createFromTime(1).toString()
          );
          done();
        }
    ).catch(function(err) {
          done(err);
        }
    );
  });

  it('Check range 2', function(done) {
    var messageFilter = new MessageFilter();
    messageFilter
        .user(1)
        .today(new Date('2014/12/06'));
    MessageManager.getMessages(
        messageFilter.getFilter()
    ).then(
        function(result) {
          result.length.should.be.equal(2);
          var ids = [
            ObjectID.createFromTime(1).toString(),
            ObjectID.createFromTime(2).toString()
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

  it('Check range 3', function(done) {
    var messageFilter = new MessageFilter();
    messageFilter
        .user(1)
        .today(new Date('2014/12/18'));
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

  it('Check range 4', function(done) {
    var messageFilter = new MessageFilter();
    messageFilter
        .user(1)
        .today(new Date('2015/12/18'));
    MessageManager.getMessages(
        messageFilter.getFilter()
    ).then(
        function(result) {
          result.length.should.be.equal(1);
          result[0].getId().should.be.equal(
              ObjectID.createFromTime(3).toString()
          );
          done();
        }
    ).catch(function(err) {
          done(err);
        }
    );
  });
});
