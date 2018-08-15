'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (state) {
  var offline = state.offline,
      rest = (0, _objectWithoutProperties3.default)(state, ['offline']);

  return {
    get: offline,
    set: function set(offlineState) {
      return typeof offlineState === 'undefined' ? rest : (0, _extends3.default)({ offline: offlineState }, rest);
    }
  };
};