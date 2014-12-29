var defineMessageStruct = require('../structs/message.json');
var Builder = require('entityx').Builder;
var Message = Builder.buildEntity(defineMessageStruct);

Message.prototype.hide = function() {
  return this._updateSimple(
      {'hide': true}, 100, 'Error on hide message');
};

Message.prototype.unhide = function() {
  return this._updateSimple(
      {'hide': false}, 100, 'Error on unhide message');
};

Message.prototype.archive = function() {
  return this._updateSimple(
      {'archived': true}, 100, 'Error on archive message');
};

Message.prototype.archive = function() {
  return this._updateSimple(
      {'archived': false}, 100, 'Error on unarchive message');
};

Message.prototype.updateFirstView = function(date) {
  if (date == null) {
    date = new Date();
  }
  return this._updateSimple(
      {'firstView': date}, 100, 'Error on update first message');
};

Message.prototype.updateConfirmView = function(date) {
  if (date == null) {
    date = new Date();
  }
  return this._updateSimple(
      {'confirmView': date}, 100, 'Error on confirmView message');
};

module.exports = Message;
