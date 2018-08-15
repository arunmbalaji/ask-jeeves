'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _persist = require('./persist');

var _persist2 = _interopRequireDefault(_persist);

var _detectNetwork = require('./detectNetwork');

var _detectNetwork2 = _interopRequireDefault(_detectNetwork);

var _effect = require('./effect');

var _effect2 = _interopRequireDefault(_effect);

var _retry = require('./retry');

var _retry2 = _interopRequireDefault(_retry);

var _discard = require('./discard');

var _discard2 = _interopRequireDefault(_discard);

var _defaultCommit = require('./defaultCommit');

var _defaultCommit2 = _interopRequireDefault(_defaultCommit);

var _defaultRollback = require('./defaultRollback');

var _defaultRollback2 = _interopRequireDefault(_defaultRollback);

var _persistAutoRehydrate = require('./persistAutoRehydrate');

var _persistAutoRehydrate2 = _interopRequireDefault(_persistAutoRehydrate);

var _offlineStateLens = require('./offlineStateLens');

var _offlineStateLens2 = _interopRequireDefault(_offlineStateLens);

var _queue = require('./queue');

var _queue2 = _interopRequireDefault(_queue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  rehydrate: true, // backward compatibility, TODO remove in the next breaking change version
  persist: _persist2.default,
  detectNetwork: _detectNetwork2.default,
  effect: _effect2.default,
  retry: _retry2.default,
  discard: _discard2.default,
  defaultCommit: _defaultCommit2.default,
  defaultRollback: _defaultRollback2.default,
  persistAutoRehydrate: _persistAutoRehydrate2.default,
  offlineStateLens: _offlineStateLens2.default,
  queue: _queue2.default,
  returnPromises: false
};