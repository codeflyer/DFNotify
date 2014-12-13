var path = require('path');
var connectionManager = require('../connectionManager');
var MessageManager = require('../../lib/business/MessageManager');

describe('MessageManager createNew', function() {

  before(function(done) {
    require('readyness').doWhen(done);
  });

  beforeEach(function(done) {
    var fixtures = connectionManager.getFixtures();
    fixtures.clear(function(err) {
      fixtures.load(path.join(__dirname, '..', 'fixtures'), done);
    });
  });

  it('Entity save', function(done) {
    MessageManager.createNewMessage({
      'idUser': 1,
      'title': 'test',
      message: 'msg',
      from: new Date('2014/12/12')
    }).then(
        function(result) {
          result.load().then(
              function() {
                result.getTitle().should.be.equal('test');
                result.getMessage().should.be.equal('msg');
                result.getFrom().should.be.eql(new Date('2014/12/12'));
                (result.getExpires() == null).should.be.true;
                result.isArchive().should.be.false;
                result.isHide().should.be.false;
                result.isConfirmRequired().should.be.false;
                result.isRemoveIfExpired().should.be.false;
                result.isPopupOnFirstView().should.be.false;
                (result.getFirstView() == null).should.be.true;
                (result.getConfirmView() == null).should.be.true;
                done();
              }
          ).catch(function(err) {
                done(err);
              });
        }
    ).catch(function(err) {
          done(err);
        }
    );
  });

  it('Entity save with expires', function(done) {
    MessageManager.createNewMessage({
      'idUser': 1,
      'title': 'test',
      message: 'msg',
      from: new Date('2014/12/12'),
      expires: new Date('2014/12/15')
    }).then(
        function(result) {
          result.load().then(
              function() {
                result.getTitle().should.be.equal('test');
                result.getMessage().should.be.equal('msg');
                result.getFrom().should.be.eql(new Date('2014/12/12'));
                result.getExpires().should.be.eql(new Date('2014/12/15'));
                result.isArchive().should.be.false;
                result.isHide().should.be.false;
                result.isConfirmRequired().should.be.false;
                result.isRemoveIfExpired().should.be.false;
                result.isPopupOnFirstView().should.be.false;
                (result.getFirstView() == null).should.be.true;
                (result.getConfirmView() == null).should.be.true;
                done();
              }
          ).catch(function(err) {
                done(err);
              });
        }
    ).catch(function(err) {
          done(err);
        }
    );
  });

  it('Entity save with confirm required', function(done) {
    MessageManager.createNewMessage({
      'idUser': 1,
      'title': 'test',
      message: 'msg',
      from: new Date('2014/12/12'),
      expires: new Date('2014/12/15'),
      confirmRequired : true
    }).then(
        function(result) {
          result.load().then(
              function() {
                result.getTitle().should.be.equal('test');
                result.getMessage().should.be.equal('msg');
                result.getFrom().should.be.eql(new Date('2014/12/12'));
                result.getExpires().should.be.eql(new Date('2014/12/15'));
                result.isArchive().should.be.false;
                result.isHide().should.be.false;
                result.isConfirmRequired().should.be.true;
                result.isRemoveIfExpired().should.be.false;
                result.isPopupOnFirstView().should.be.false;
                (result.getFirstView() == null).should.be.true;
                (result.getConfirmView() == null).should.be.true;
                done();
              }
          ).catch(function(err) {
                done(err);
              });
        }
    ).catch(function(err) {
          done(err);
        }
    );
  });

  it('Entity save with remove if expired', function(done) {
    MessageManager.createNewMessage({
      'idUser': 1,
      'title': 'test',
      message: 'msg',
      from: new Date('2014/12/12'),
      expires: new Date('2014/12/15'),
      removeIfExpired : true
    }).then(
        function(result) {
          result.load().then(
              function() {
                result.getTitle().should.be.equal('test');
                result.getMessage().should.be.equal('msg');
                result.getFrom().should.be.eql(new Date('2014/12/12'));
                result.getExpires().should.be.eql(new Date('2014/12/15'));
                result.isArchive().should.be.false;
                result.isHide().should.be.false;
                result.isConfirmRequired().should.be.false;
                result.isRemoveIfExpired().should.be.true;
                result.isPopupOnFirstView().should.be.false;
                (result.getFirstView() == null).should.be.true;
                (result.getConfirmView() == null).should.be.true;
                done();
              }
          ).catch(function(err) {
                done(err);
              });
        }
    ).catch(function(err) {
          done(err);
        }
    );
  });
});
