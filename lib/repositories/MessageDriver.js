var util = require('util');
var MongoDBDriver = require('entityx').drivers.MongoDBObjectID;
var Promise = require('bluebird');
var constant = require('../constant');

var MessageDriver = function(id) {
  MongoDBDriver.call(this, {
    'useTimestamp': true,
    'collectionName': 'dfcore_notifies'
  }, id);
};
util.inherits(MessageDriver, MongoDBDriver);

MessageDriver.prototype._setSort = function(filters, sort) {
  if (sort != null) {
    return sort;
  }
  return {'from' : 1};
};

MessageDriver.prototype._addFilters = function(filters, query) {
  try {
    var andFilter = [];
    if (filters.idUser != null) {
      andFilter.push({idUser: filters.idUser});
    }

    if (filters.archived === constant.FILTER_ARCHIVED_YES) {
      andFilter.push({archived: true});
    } else if (filters.archived === constant.FILTER_ARCHIVED_NO) {
      andFilter.push({archived: false});
    }

    if (filters.hide === constant.FILTER_HIDDEN_YES) {
      andFilter.push({hide: true});
    } else if (filters.hide === constant.FILTER_HIDDEN_NO) {
      andFilter.push({hide: false});
    }

    if (filters.today != null) {
      andFilter.push({from: {$lte: filters.today}});
      var orFilter = [];
      orFilter.push({expires: {$gte: filters.today}});
      orFilter.push({expires: null});
      andFilter.push({$or: orFilter});
    }
    if (andFilter.length > 0) {
      query.$and = andFilter;
    }
  } catch (e) {
    console.log(e);
  }
};

MessageDriver.prototype.countMessages = function(filters) {
  var that = this;
  return new Promise(function(resolve, reject) {
    var query = {};
    that._addFilters(filters, query);
    that.getCollection().find(query).count(function(err, count) {
      if (err) {
        return reject(err);
      }
      resolve(count);
    });
  });
};

MessageDriver.prototype.getMessages = function(filters, sort, skip, limit) {
  var that = this;
  return new Promise(function(resolve, reject) {

    var query = {};
    that._addFilters(filters, query);
    sort = that._setSort(filters, sort);

    var options = {
      'limit': limit,
      'skip': skip,
      'sort': sort
    };

    that.getCollection().find(query, options).toArray(function(err, docs) {
      if (err) {
        console.log(err);
//        logger.error(err);
        return reject(err);
      }
      resolve(docs);
    });
  });
};

module.exports = MessageDriver;
