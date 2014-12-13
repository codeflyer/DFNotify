var util = require('util');
var Factory = require('entityx').Factory;
var Entity = require('entityx').Entity;
var Promise = require('bluebird');
var ErrorX = require('codeflyer-errorx');

var Message = function() {
  Entity.call(this, {'useTimestamp': true});
};
util.inherits(Message, Entity);

Message.prototype._getDriver = function() {
  return Factory.getDriver('DFNotify/Message', this.getId());
};

/**
 * Get the identifier of the user
 * @return {*}
 */
Message.prototype.getIdUser = function() {
  return this._getData('idUser');
};

/**
 * Get the title of the notify
 * @return {string}
 */
Message.prototype.getTitle = function() {
  return this._getData('title');
};

/**
 * Get the message of the notify
 * @return {string}
 */
Message.prototype.getMessage = function() {
  return this._getData('message');
};

/**
 * Get the start date of the notify
 * @return {Date}
 */
Message.prototype.getFrom = function() {
  return this._getData('from');
};

/**
 * Get the expiress of the notify
 * @return {Date|null}
 */
Message.prototype.getExpires = function() {
  return this._getData('expires');
};

/**
 * Check if the notify is archived
 * @return {boolean}
 */
Message.prototype.isArchive = function() {
  return this._getData('archived');
};

/**
 * Check if the notify is hidden
 * @return {boolean}
 */
Message.prototype.isHide = function() {
  return this._getData('hide');
};

/**
 * Get the first view of the notify
 * @return {Date|null}
 */
Message.prototype.getFirstView = function() {
  return this._getData('firstView');
};

/**
 * Get the date of confirm view of the notify
 * @return {Date|null}
 */
Message.prototype.getConfirmView = function() {
  return this._getData('confirmView');
};

/**
 * Check if is required the confirm
 * @return {boolean}
 */
Message.prototype.isConfirmRequired = function() {
  return this._getData('confirmRequired');
};

/**
 * Check if the notify should be removed on expires
 * @return {boolean}
 */
Message.prototype.isRemoveIfExpired = function() {
  return this._getData('removeIfExpired');
};

/**
 * Check if the notify should cast a popup on first view
 * @return {boolean}
 */
Message.prototype.isPopupOnFirstView = function() {
  return this._getData('popupOnFirstView');
};

/**
 * Get the added custom data
 * @return {{}}
 */
Message.prototype.getCustomData = function() {
  return this._getData('customData');
};

/**
 * Set the identifier of the user
 * @param {*} idUser
 */
Message.prototype.setIdUser = function(idUser) {
  return this._setData('idUser', idUser);
};

/**
 * Set the title of the notify
 * @param {string} title
 */
Message.prototype.setTitle = function(title) {
  return this._setData('title', title);
};

/**
 * Set the message of the notify
 * @param {string} message
 */
Message.prototype.setMessage = function(message) {
  return this._setData('message', message);
};

/**
 * Set the start date of the notify
 * @param {Date} from
 */
Message.prototype.setFrom = function(from) {
  return this._setData('from', from);
};

/**
 * Set the expires of the notify
 * @param {Date|null} expires
 */
Message.prototype.setExpires = function(expires) {
  return this._setData('expires', expires);
};

/**
 * Set the notify is archived
 * @param {boolean} archived
 */
Message.prototype.setIsArchive = function(archived) {
  return this._setData('archived', archived);
};

/**
 * Set if the notify is hidden
 * @param {boolean} hide
 */
Message.prototype.setIsHide = function(hide) {
  return this._setData('hide', hide);
};

/**
 * Set the first view of the notify
 * @param {Date|null} firstView
 */
Message.prototype.setFirstView = function(firstView) {
  return this._setData('firstView', firstView);
};

/**
 * Set the date of confirm view of the notify
 * @param {Date|null} confirmView
 */
Message.prototype.setConfirmView = function(confirmView) {
  return this._setData('confirmView', confirmView);
};

/**
 * Set if is required the confirm
 * @param {boolean} isConfirmRequired
 */
Message.prototype.setIsConfirmRequired = function(isConfirmRequired) {
  return this._setData('confirmRequired', isConfirmRequired);
};

/**
 * Set if the notify should be removed on expires
 * @param {boolean} removeIfExpired
 */
Message.prototype.setIsRemoveIfExpired = function(removeIfExpired) {
  return this._setData('removeIfExpired', removeIfExpired);
};

/**
 * Set if the notify should throw a popup on first view
 * @param {boolean} popupOnFirstView
 */
Message.prototype.setIsPopupOnFirstView = function(popupOnFirstView) {
  return this._setData('popupOnFirstView', popupOnFirstView);
};

/**
 * Set the custom data
 * @param {{}} customData
 */
Message.prototype.setCustomData = function(customData) {
  return this._setData('customData', customData);
};

Message.prototype._loadDetails = function(details, callback) {
  this._setData('idUser', details.idUser);
  this._setData('title', details.title);
  this._setData('message', details.message);

  this._setData('from', details.from);
  this._setData('expires', details.expires);

  this._setData('archived', details.archived);
  this._setData('hide', details.hide);

  this._setData('firstView', details.firstView);
  this._setData('confirmView', details.confirmView);

  this._setData('confirmRequired', details.confirmRequired);
  this._setData('removeIfExpired', details.removeIfExpired);
  this._setData('popupOnFirstView', details.popupOnFirstView);

  this._setData('customData', details.customData);
  callback(null, details);
};

Message.prototype.hide = function() {
  var that = this;
  return new Promise(function(resolve, reject) {
    that._getDriver().update({'hide': true}).then(
        function() {
          that._isLoad = false;
          resolve();
        }
    ).catch(function(err) {
          reject(new ErrorX(100, 'Error on hide message', err));
        });
  });
};

Message.prototype.unhide = function() {
  var that = this;
  return new Promise(function(resolve, reject) {
    that._getDriver().update({'hide': false}).then(
        function() {
          that._isLoad = false;
          resolve();
        }
    ).catch(function(err) {
          reject(new ErrorX(100, 'Error on unhide message', err));
        });
  });
};

Message.prototype.archive = function() {
  var that = this;
  return new Promise(function(resolve, reject) {
    that._getDriver().update({'archived': true}).then(
        function() {
          that._isLoad = false;
          resolve();
        }
    ).catch(function(err) {
          reject(new ErrorX(100, 'Error on archived message', err));
        });
  });
};

Message.prototype.unarchive = function() {
  var that = this;
  return new Promise(function(resolve, reject) {
    that._getDriver().update({'archived': false}).then(
        function() {
          that._isLoad = false;
          resolve();
        }
    ).catch(function(err) {
          reject(new ErrorX(100, 'Error on unarchived message', err));
        });
  });
};

module.exports = Message;
