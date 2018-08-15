'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _reactNative = require('react-native');

var _reduxPersist = require('redux-persist');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// $FlowIgnore
exports.default = function (store, options, callback) {
  return (0, _reduxPersist.persistStore)(store, (0, _extends3.default)({ storage: _reactNative.AsyncStorage }, options), callback);
}; // eslint-disable-line