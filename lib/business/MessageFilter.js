var constant = require('../constant');

function MessageFilter() {
  this.filter = {};
}

MessageFilter.prototype.user = function(idUser) {
  this.filter.idUser = idUser;
  return this;
};

MessageFilter.prototype.isArchived = function() {
  this.filter.archived = constant.FILTER_ARCHIVED_YES;
  return this;
};

MessageFilter.prototype.isNotArchived = function() {
  this.filter.archived = constant.FILTER_ARCHIVED_NO;
  return this;
};

MessageFilter.prototype.isHidden = function() {
  this.filter.hide = constant.FILTER_HIDDEN_YES;
  return this;
};

MessageFilter.prototype.isNotHidden = function() {
  this.filter.hide = constant.FILTER_HIDDEN_NO;
  return this;
};

MessageFilter.prototype.today = function(date) {
  this.filter.today = date;
  return this;
};

MessageFilter.prototype.getFilter = function() {
  return this.filter;
};

module.exports = MessageFilter;
