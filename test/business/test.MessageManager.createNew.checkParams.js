var path = require('path');
var connectionManager = require('../connectionManager');
var MessageManager = require('../../lib/business/MessageManager');

describe('MessageManager createNew checkParams', function() {

  before(function(done) {
    require('readyness').doWhen(done);
  });

  beforeEach(function(done) {
    var fixtures = connectionManager.getFixtures();
    fixtures.clear(function(err) {
      fixtures.load(path.join(__dirname, '..', 'fixtures'), done);
    });
  });

  it('Entity option is null', function(done) {
    MessageManager.createNewMessage().then(
        function(result) {
          done('should throw an error');
        }
    ).catch(function(err) {
          err.code.should.be.equal(400);
          err.message.should.be.equal('Options not defined');
          done();
        }
    );
  });

  it('Entity option is not an object', function(done) {
    MessageManager.createNewMessage('hello').then(
        function(result) {
          done('should throw an error');
        }
    ).catch(function(err) {
          err.code.should.be.equal(400);
          err.message.should.be.equal('Options should be an object');
          done();
        }
    );
  });

  it('idUser note defined', function(done) {
    MessageManager.createNewMessage({}).then(
        function(result) {
          done('should throw an error');
        }
    ).catch(function(err) {
          err.code.should.be.equal(400);
          err.message.should.be.equal('idUser not defined');
          done();
        }
    );
  });

  it('Title note defined', function(done) {
    MessageManager.createNewMessage({'idUser': 1}).then(
        function(result) {
          done('should throw an error');
        }
    ).catch(function(err) {
          err.code.should.be.equal(400);
          err.message.should.be.equal(
              'title should be a string greather than 0');
          done();
        }
    );
  });

  it('Title length == 0', function(done) {
    MessageManager.createNewMessage({'idUser': 1, 'title': ''}).then(
        function(result) {
          done('should throw an error');
        }
    ).catch(function(err) {
          err.code.should.be.equal(400);
          err.message.should.be.equal(
              'title should be a string greather than 0');
          done();
        }
    );
  });

  it('Message note defined', function(done) {
    MessageManager.createNewMessage({'idUser': 1, 'title': 'test'}).then(
        function(result) {
          done('should throw an error');
        }
    ).catch(function(err) {
          err.code.should.be.equal(400);
          err.message.should.be.equal(
              'message should be a string greather than 0');
          done();
        }
    );
  });

  it('Message length == 0', function(done) {
    MessageManager.createNewMessage(
        {'idUser': 1, 'title': 'test', message: ''}
    ).then(
        function(result) {
          done('should throw an error');
        }
    ).catch(function(err) {
          err.code.should.be.equal(400);
          err.message.should.be.equal(
              'message should be a string greather than 0');
          done();
        }
    );
  });

  it('From is not a date object', function(done) {
    MessageManager.createNewMessage(
        {'idUser': 1, 'title': 'test', message: 'msg', from: 'fake'}
    ).then(
        function(result) {
          done('should throw an error');
        }
    ).catch(function(err) {
          err.code.should.be.equal(400);
          err.message.should.be.equal(
              'from should be a Date object');
          done();
        }
    );
  });

  it('Expires is not a date object', function(done) {
    MessageManager.createNewMessage(
        {
          'idUser': 1,
          'title': 'test',
          message: 'msg',
          from: new Date(),
          expires: 'fake'
        }
    ).then(
        function(result) {
          done('should throw an error');
        }
    ).catch(function(err) {
          err.code.should.be.equal(400);
          err.message.should.be.equal(
              'expires should be a Date object');
          done();
        }
    );
  });
});
