var path = require('path');
var connectionManager = require('connection-store');
var Factory = require('entityx').Factory;
var ObjectID = require('mongodb').ObjectID;
var moduleEntryPoint = require('../../lib/index');

describe('MessageDriver load', function() {

  before(function(done) {
    require('readyness').doWhen(done);
  });

  beforeEach(function(done) {
    var fixtures = connectionManager.getConnection('fixtures');
    connectionManager.getConnection().dropDatabase(function(err) {
      fixtures.load(path.join(__dirname, '..', 'fixtures'), done);
    });
  });

  it('Should fail on load', function(done) {
    var driver = Factory.getRepository('DFNotify/Message',
        ObjectID.createFromTime(1000).toString());
    driver.loadEntity().then(
        function(result) {
          (result == null).should.be.true;
          done();
        }
    ).catch(function(err) {
          done(err);
        });
  });

  it('Should success on load', function(done) {
    var driver = Factory.getRepository('DFNotify/Message',
        ObjectID.createFromTime(1).toString());
    driver.loadEntity().then(
        function(result) {
          result.should.be.eql({
            _id: ObjectID.createFromTime(1),
            idUser: 1,
            title: 'notify title 1',
            message: 'notify message 1',
            from: new Date('2014/12/01'),
            moreAction: 'http://www.google.com',
            moreLabel: 'Per saperne di più',
            expires: new Date('2014/12/15'),
            archived: false,
            hide: true,
            firstView: new Date('2014/12/3'),
            confirmView: new Date('2014/12/4'),
            confirmRequired: false,
            removeIfExpired: false,
            popupOnFirstView: false,
            customData: {
              val1: 1,
              val2: 2,
              val3: 3
            },
            '_ts': {
              'created': new Date('2014/11/01'),
              'modified': new Date('2014/11/01'),
              'deleted': null
            }
          });
          done();
        }
    ).catch(function(err) {
          done(err);
        });
  });

});
