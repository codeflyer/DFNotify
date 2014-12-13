var path = require('path');
var connectionManager = require('../connectionManager');
var Factory = require('entityx').Factory;
var ObjectID = require('mongodb').ObjectID;

describe('Message entity accessors', function() {

  before(function(done) {
    require('readyness').doWhen(done);
  });

  beforeEach(function(done) {
    var fixtures = connectionManager.getFixtures();
    fixtures.clear(function(err) {
      fixtures.load(path.join(__dirname, '..', 'fixtures'), done);
    });
  });

  it('Entity load', function(done) {
    var model = Factory.getModel('DFNotify/Message',
        ObjectID.createFromTime(1).toString());
    model.load().then(
        function(result) {
          model.getIdUser().should.be.equal(1);
          model.getTitle().should.be.equal('notify title 1');
          model.getMessage().should.be.equal('notify message 1');
          model.getFrom().should.be.eql(new Date('2014/12/01'));
          model.getExpires().should.be.eql(new Date('2014/12/15'));
          model.isArchive().should.be.false;
          model.isHide().should.be.true;
          model.getFirstView().should.be.eql(new Date('2014/12/3'));
          model.getConfirmView().should.be.eql(new Date('2014/12/4'));
          model.isConfirmRequired().should.be.true;
          model.isRemoveIfExpired().should.be.false;
          model.getCustomData().should.be.eql({
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
