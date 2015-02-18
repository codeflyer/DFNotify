var path = require('path');
var connectionManager = require('connection-store');
var Factory = require('entityx').Factory;

describe('MessageDriver save', function() {

  before(function(done) {
    require('readyness').doWhen(done);
  });

  beforeEach(function(done) {
    var fixtures = connectionManager.getConnection('fixtures');
    connectionManager.getConnection().dropDatabase(function(err) {
      fixtures.load(path.join(__dirname, '..', 'fixtures'), done);
    });
  });

  it('Should success on load', function(done) {
    var driver = Factory.getRepository('DFNotify/Message');
    var valueToInsert = {
      title: 'notify title',
      message: 'notify message',
      moreAction: 'http://www.google.com',
      moreLabel: 'Per saperne di più',
      from: new Date('2014/12/01'),
      expires: new Date('2014/12/31'),
      archived: false,
      hide: false,
      firstView: new Date('2014/12/3'),
      confirmView: new Date('2014/12/4'),
      confirmRequired: true,
      removeIfExpired: false,
      customData: {
        val1: 1,
        val2: 2,
        val3: 3
      }
    };

    driver.insert(valueToInsert).then(
        function(result) {
          result.should.be.not.eql({
            title: 'notify title',
            message: 'notify message',
            moreAction: 'http://www.google.com',
            moreLabel: 'Per saperne di più',
            from: new Date('2014/12/01'),
            expires: new Date('2014/12/31'),
            archived: false,
            hide: false,
            firstView: new Date('2014/12/3'),
            confirmView: new Date('2014/12/4'),
            confirmRequired: true,
            removeIfExpired: false,
            customData: {
              val1: 1,
              val2: 2,
              val3: 3
            }
          });
          done();
        }
    ).catch(function(err) {
          return done(err);
        });
  });
});
