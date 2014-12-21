require('./module');
var connectionManager = require('entityx').ConnectionManager;
var MessageManager = require('./business/MessageManager');
var MessageFilter = require('./business/MessageFilter');
module.exports = {
  MessageManager : MessageManager,
  MessageFilter : MessageFilter,
  setMongoDbConnection: function(db) {
    if (!connectionManager.hasConnection()) {
      connectionManager.addConnection(db);
    }
  }
};
