'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.busy = exports.completeRetry = exports.scheduleRetry = exports.networkStatusChanged = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var networkStatusChanged = exports.networkStatusChanged = function networkStatusChanged(params) {
  var payload = void 0;
  if ((typeof params === 'undefined' ? 'undefined' : (0, _typeof3.default)(params)) === 'object') {
    payload = params;
  } else {
    payload = { online: params };
  }
  return {
    type: _constants.OFFLINE_STATUS_CHANGED,
    payload: payload
  };
};

var scheduleRetry = exports.scheduleRetry = function scheduleRetry() {
  var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return {
    type: _constants.OFFLINE_SCHEDULE_RETRY,
    payload: {
      delay: delay
    }
  };
};

var completeRetry = exports.completeRetry = function completeRetry(action) {
  return {
    type: _constants.OFFLINE_COMPLETE_RETRY,
    payload: action
  };
};

var busy = exports.busy = function busy(isBusy) {
  return {
    type: _constants.OFFLINE_BUSY,
    payload: { busy: isBusy }
  };
};