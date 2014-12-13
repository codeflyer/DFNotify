var Factory = require('entityx').Factory;
var ErrorX = require('codeflyer-errorx');
var Promise = require('bluebird');

var MessageManager = function() {
  var createNewMessage = function createNewMessage(options) {
    return new Promise(function(resolve, reject) {

      if (options == null) {
        return reject(new ErrorX(400, 'Options not defined'));
      }
      if (Object.prototype.toString.call(options) !== '[object Object]') {
        return reject(new ErrorX(400, 'Options should be an object'));
      }

      if (options.idUser == null) {
        return reject(new ErrorX(400, 'idUser not defined'));
      }

      if (options.title == null || options.title.length === 0) {
        return reject(
            new ErrorX(400, 'title should be a string greather than 0'));
      }

      if (options.message == null || options.message.length === 0) {
        return reject(
            new ErrorX(400, 'message should be a string greather than 0'));
      }

      var createOptions = {
        from: new Date(),
        expires: null,
        isArchive: false,
        isHide: false,
        firstView: null,
        confirmView: null,
        confirmRequired: false,
        removeIfExpired: false,
        popupUnFirstView: false,
        customData: {}
      };

      createOptions.idUser = options.idUser;
      createOptions.title = options.title;
      createOptions.message = options.message;

      if (options.from != null) {
        if (Object.prototype.toString.call(options.from) !== '[object Date]') {
          return reject(new ErrorX(400, 'from should be a Date object'));
        }
        createOptions.from = options.from;
      }

      if (options.expires != null) {
        if (
            Object.prototype.toString.call(options.expires) !== '[object Date]'
        ) {
          return reject(new ErrorX(400, 'expires should be a Date object'));
        }
        createOptions.expires = options.expires;
      }

      if (options.confirmRequired != null &&
          options.confirmRequired === true) {
        createOptions.confirmRequired = options.confirmRequired;
      }

      if (options.removeIfExpired != null &&
          options.removeIfExpired === true) {
        createOptions.removeIfExpired = options.removeIfExpired;
      }

      var model = Factory.getModel('DFNotify/Message');
      model.setIdUser(createOptions.idUser);
      model.setTitle(createOptions.title);
      model.setMessage(createOptions.message);
      model.setFrom(createOptions.from);
      model.setExpires(createOptions.expires);
      model.setIsConfirmRequired(createOptions.confirmRequired);
      model.setIsRemoveIfExpired(createOptions.removeIfExpired);
      model.setIsPopupOnFirstView(createOptions.popupUnFirstView);
      model.setCustomData(createOptions.customData);

      model.setIsArchive(false);
      model.setIsHide(false);
      model.setFirstView(null);
      model.setConfirmView(null);
      return model.insert().then(
          function(result) {
            resolve(model);
          }
      ).catch(function(err) {
            return reject(new ErrorX(400, 'Message creation failed', err));
          }
      );
    });
  };

  /**
   * Get the message list
   * @param {{}} filters - The filters to apply
   * @param {{}|null} sort
   * @param {integer|null} skip Skip results
   * @param {integer|null} limit Limit result
   * @return {Promise}
   */
  var getMessages = function(filters, sort, skip, limit) {
    return new Promise(function(resolve, reject) {
      Factory.getDriver('DFNotify/Message')
          .getMessages(filters, sort, skip, limit)
          .then(
          function(result) {
            var messages = [];
            result.forEach(function(message) {
              messages.push(
                  Factory.getModel('DFNotify/Message',
                      message._id, message));
            });
            resolve(messages);
          }
      ).catch(function(err) {
            reject(err);
          }
      );
    });
  };

  /**
   * Count the messages related to the filter
   * @param {{}} filters
   * @return {*}
   */
  var countMessages = function(filters) {
    return new Promise(function(resolve, reject) {
      Factory.getDriver('DFNotify/Message').countMessages(filters).then(
          function(count) {
            resolve(count);
          }
      ).catch(
          function(err) {
            reject(err);
          }
      );
    });
  };

  return {
    createNewMessage: createNewMessage,
    getMessages: getMessages,
    countMessages: countMessages
  };
}();

module.exports = MessageManager;
