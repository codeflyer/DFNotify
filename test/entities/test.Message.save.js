var path = require('path');
var connectionManager = require('../connectionManager');
var Factory = require('entityx').Factory;
var moduleEntryPoint = require('../../lib/index');

describe('Message entity save', function() {

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

  it('Entity save', function(done) {
    var model = Factory.getModel('DFNotify/Message');
    model.setIdUser(2);
    model.setTitle('other title');
    model.setMessage('other message');
    model.setMoreAction('http://www.yahoo.com');
    model.setMoreLabel('Search in yahoo');
    model.setFrom(new Date('2014/12/01'));
    model.setExpires(new Date('2014/12/31'));
    model.setIsArchive(true);
    model.setIsHide(false);
    model.setFirstView(new Date('2014/12/3'));
    model.setConfirmView(null);
    model.setIsConfirmRequired(true);
    model.setIsRemoveIfExpired(false);
    model.setCustomData({a : 1});
    model.insert().then(
        function(result) {
          done();
        }
    ).catch(function(err) {
          done(err);
        }
    );
  });
});
