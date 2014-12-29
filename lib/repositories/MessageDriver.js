var constant = require('../constant');
var defineMessageStruct = require('../structs/message.json');
var Builder = require('entityx').Builder;
var MessageDriver = Builder.buildRepository(defineMessageStruct);

MessageDriver.prototype._setSort = function(filters, sort) {
  if (sort != null) {
    return sort;
  }
  return {'from': 1};
};

MessageDriver.prototype._addFilters = function(filters, query) {
  try {
    var andFilter = [];
    if (filters.idUser != null) {
      andFilter.push({idUser: filters.idUser});
    }

    if (filters.viewed === constant.FILTER_VIEWED_YES) {
      andFilter.push({firstView: {$ne: null}});
    } else if (filters.viewed === constant.FILTER_VIEWED_NO) {
      andFilter.push({firstView: null});
    }

    if (filters.confirmViewed === constant.FILTER_CONFIRM_VIEWED_YES) {
      andFilter.push({confirmView: {$ne: null}});
    } else if (filters.confirmViewed === constant.FILTER_CONFIRM_VIEWED_NO) {
      andFilter.push({confirmView: null});
    }

    if (filters.confirmRequired === constant.FILTER_CONFIRM_REQUIRED_YES) {
      andFilter.push({confirmRequired: true});
    } else if (
        filters.confirmRequired === constant.FILTER_CONFIRM_REQUIRED_NO) {
      andFilter.push({confirmRequired: false});
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
  var query = {};
  this._addFilters(filters, query);
  return this.mongoDbCount(query);
};

MessageDriver.prototype.getMessages = function(filters, sort, skip, limit) {
  var query = {};
  this._addFilters(filters, query);
  sort = this._setSort(filters, sort);

  var options = {
    'limit': limit,
    'skip': skip,
    'sort': sort
  };
  return this.mongoDbFindToArray(query, {}, options);
};

module.exports = MessageDriver;
