'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enhanceReducer = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global $Shape */

var initialState = {
  busy: false,
  lastTransaction: 0,
  online: false,
  outbox: [],
  retryCount: 0,
  retryScheduled: false,
  netInfo: {
    isConnectionExpensive: null,
    reach: 'NONE'
  }
};

var buildOfflineUpdater = function buildOfflineUpdater(dequeue, enqueue) {
  return function offlineUpdater() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    // Update online/offline status
    if (action.type === _constants.OFFLINE_STATUS_CHANGED) {
      return (0, _extends3.default)({}, state, {
        online: action.payload.online,
        netInfo: action.payload.netInfo
      });
    }

    if (action.type === _constants.PERSIST_REHYDRATE && action.payload) {
      return (0, _extends3.default)({}, state, action.payload.offline, {
        online: state.online,
        netInfo: state.netInfo,
        retryScheduled: initialState.retryScheduled,
        retryCount: initialState.retryCount,
        busy: initialState.busy
      });
    }

    if (action.type === _constants.OFFLINE_SCHEDULE_RETRY) {
      return (0, _extends3.default)({}, state, {
        retryScheduled: true,
        retryCount: state.retryCount + 1
      });
    }

    if (action.type === _constants.OFFLINE_COMPLETE_RETRY) {
      return (0, _extends3.default)({}, state, { retryScheduled: false });
    }

    if (action.type === _constants.OFFLINE_BUSY && action.payload && typeof action.payload.busy === 'boolean') {
      return (0, _extends3.default)({}, state, { busy: action.payload.busy });
    }

    // Add offline actions to queue
    if (action.meta && action.meta.offline) {
      var transaction = state.lastTransaction + 1;
      var stamped = (0, _extends3.default)({}, action, {
        meta: (0, _extends3.default)({}, action.meta, { transaction: transaction })
      });
      var offline = state;
      return (0, _extends3.default)({}, state, {
        lastTransaction: transaction,
        outbox: enqueue(offline.outbox, stamped, { offline: offline })
      });
    }

    // Remove completed actions from queue (success or fail)
    if (action.meta && action.meta.completed === true) {
      var _offline = state;
      return (0, _extends3.default)({}, state, {
        outbox: dequeue(_offline.outbox, action, { offline: _offline }),
        retryCount: 0
      });
    }

    if (action.type === _constants.RESET_STATE) {
      return (0, _extends3.default)({}, initialState, {
        online: state.online,
        netInfo: state.netInfo
      });
    }

    return state;
  };
};

var enhanceReducer = exports.enhanceReducer = function enhanceReducer(reducer, config) {
  var _config$queue = config.queue,
      dequeue = _config$queue.dequeue,
      enqueue = _config$queue.enqueue;

  var offlineUpdater = buildOfflineUpdater(dequeue, enqueue);

  return function (state, action) {
    var offlineState = void 0;
    var restState = void 0;
    if (typeof state !== 'undefined') {
      offlineState = config.offlineStateLens(state).get;
      restState = config.offlineStateLens(state).set();
    }

    return config.offlineStateLens(reducer(restState, action)).set(offlineUpdater(offlineState, action));
  };
};