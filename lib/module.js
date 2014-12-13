var path = require('path');
var ErrorX = require('codeflyer-errorx');
var Factory = require('entityx').Factory;

if (Factory.getApplicationRoot() == null) {
  throw new ErrorX(400, 'Application root not initialized');
}
var appRoot = path.normalize(Factory.getApplicationRoot());
var relativePath = path.relative(appRoot, path.join(__dirname, '..'));
Factory.setModule('DFNotify', relativePath);
