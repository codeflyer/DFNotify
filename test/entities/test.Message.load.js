var path = require('path');
var connectionManager = require('connection-store');
var Factory = require('entityx').Factory;
var ObjectID = require('mongodb').ObjectID;
var moduleEntryPoint = require('../../lib/index');

describe('Message entity load', function() {

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
        ObjectID.createFromTime(1).toString());
    model.load().then(
        function(result) {
          model._getData('idUser').should.be.equal(1);
          model._getData('title').should.be.equal('notify title 1');
          model._getData('message').should.be.equal('notify message 1');
          model._getData('moreAction').should.be.equal('http://www.google.com');
          model._getData('moreLabel').should.be.equal('Per saperne di più');
          model._getData('from').should.be.eql(new Date('2014/12/01'));
          model._getData('expires').should.be.eql(new Date('2014/12/15'));
          model._getData('archived').should.be.false;
          model._getData('hide').should.be.true;
          model._getData('firstView').should.be.eql(new Date('2014/12/3'));
          model._getData('confirmView').should.be.eql(new Date('2014/12/4'));
          model._getData('confirmRequired').should.be.false;
          model._getData('removeIfExpired').should.be.false;
          model._getData('customData').should.be.eql({
            val1: 1,
            val2: 2,
            val3: 3
          });
          done();
        }
    ).catch(function(err) {
          done(err);
        }
    );
  });
});
