'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOfflineMiddleware = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _constants = require('./constants');

var _actions = require('./actions');

var _send = require('./send');

var _send2 = _interopRequireDefault(_send);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var after = function after() {
  var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return new _promise2.default(function (resolve) {
    return setTimeout(resolve, timeout);
  });
};

var createOfflineMiddleware = exports.createOfflineMiddleware = function createOfflineMiddleware(config) {
  return function (store) {
    return function (next) {
      return function (action) {
        // allow other middleware to do their things
        var result = next(action);
        var promise = void 0;

        // find any actions to send, if any
        var state = store.getState();
        var offline = config.offlineStateLens(state).get;
        var context = { offline: offline };
        var offlineAction = config.queue.peek(offline.outbox, action, context);

        // create promise to return on enqueue offline action
        if (action.meta && action.meta.offline) {
          var registerAction = config.offlineActionTracker.registerAction;

          promise = registerAction(offline.lastTransaction);
        }

        // if there are any actions in the queue that we are not
        // yet processing, send those actions
        if (offlineAction && !offline.busy && !offline.retryScheduled && offline.online) {
          (0, _send2.default)(offlineAction, store.dispatch, config, offline.retryCount);
        }

        if (action.type === _constants.OFFLINE_SCHEDULE_RETRY) {
          after(action.payload.delay).then(function () {
            store.dispatch((0, _actions.completeRetry)(offlineAction));
          });
        }

        if (action.type === _constants.OFFLINE_SEND && offlineAction && !offline.busy) {
          (0, _send2.default)(offlineAction, store.dispatch, config, offline.retryCount);
        }

        return promise || result;
      };
    };
  };
};