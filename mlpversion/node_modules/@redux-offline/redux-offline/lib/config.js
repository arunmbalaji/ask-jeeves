'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyDefaults = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global $Shape */
var applyDefaults = exports.applyDefaults = function applyDefaults() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _extends3.default)({}, _defaults2.default, config);
};