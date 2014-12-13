var path = require('path');
var connectionManager = require('./connectionManager');
var index = require('../lib/index');

describe('Index test', function() {

  before(function(done) {
    require('readyness').doWhen(done);
  });

  beforeEach(function(done) {
    var fixtures = connectionManager.getFixtures();
    fixtures.clear(function(err) {
      fixtures.load(path.join(__dirname, 'fixtures'), done);
    });
  });

  it('First test', function(done) {
    index.start().should.be.equal('OK');
    done();
  });
});
