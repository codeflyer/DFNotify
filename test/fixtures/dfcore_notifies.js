/*jshint camelcase: false */
var ObjectID = require('mongodb').ObjectID;

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
module.exports.dfcore_notifies = [
  {
    _id : ObjectID.createFromTime(1),
    idUser: 1,
    title: 'notify title 1',
    message: 'notify message 1',
    moreAction: 'http://www.google.com',
    moreLabel: 'Per saperne di più',
    from: new Date('2014/12/01'),
    expires: new Date('2014/12/15'),
    archived: false,
    hide: true,
    firstView: new Date('2014/12/3'),
    confirmView: new Date('2014/12/4'),
    confirmRequired: false,
    removeIfExpired: false,
    popupOnFirstView: false,
    customData: {
      val1: 1,
      val2: 2,
      val3: 3
    },
    '_ts': {
      'created': new Date('2014/11/01'),
      'modified': new Date('2014/11/01'),
      'deleted': null
    }
  },
  {
    _id : ObjectID.createFromTime(2),
    idUser: 1,
    title: 'notify title 2',
    message: 'notify message 2',
    moreAction: null,
    moreLabel: null,
    from: new Date('2014/12/05'),
    expires: new Date('2014/12/31'),
    archived: true,
    hide: false,
    firstView: new Date('2014/12/13'),
    confirmView: null,
    confirmRequired: true,
    removeIfExpired: false,
    popupOnFirstView: true,
    customData: {
      val1: 1,
      val2: 2,
      val3: 3
    },
    '_ts': {
      'created': new Date('2014/11/01'),
      'modified': new Date('2014/11/01'),
      'deleted': null
    }
  },
  {
    _id : ObjectID.createFromTime(3),
    idUser: 1,
    title: 'notify title 3',
    message: 'notify message 3',
    moreAction: null,
    moreLabel: null,
    from: new Date('2014/12/12'),
    expires: null,
    archived: false,
    hide: false,
    firstView: null,
    confirmView: null,
    confirmRequired: false,
    removeIfExpired: false,
    popupOnFirstView: false,
    customData: {
      val1: 1,
      val2: 2,
      val3: 3
    },
    '_ts': {
      'created': new Date('2014/11/01'),
      'modified': new Date('2014/11/01'),
      'deleted': null
    }
  },
  {
    _id : ObjectID.createFromTime(4),
    idUser: 2,
    title: 'notify title 4',
    message: 'notify message 4',
    moreAction: null,
    moreLabel: null,
    from: new Date('2014/12/01'),
    expires: new Date('2014/12/31'),
    archived: false,
    hide: false,
    firstView: new Date('2014/12/3'),
    confirmView: new Date('2014/12/4'),
    confirmRequired: false,
    removeIfExpired: false,
    popupOnFirstView: false,
    customData: {
      val1: 1,
      val2: 2,
      val3: 3
    },
    '_ts': {
      'created': new Date('2014/11/01'),
      'modified': new Date('2014/11/01'),
      'deleted': null
    }
  }
];
