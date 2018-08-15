'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _reactNative = require('react-native');

var _detectNetworkNative = require('./detectNetwork.native.legacy');

var _detectNetworkNative2 = _interopRequireDefault(_detectNetworkNative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-underscore-dangle: 0 */
var DetectNetwork = function () {
  function DetectNetwork(callback) {
    var _this = this;

    (0, _classCallCheck3.default)(this, DetectNetwork);
    Object.defineProperty(this, '_hasChanged', {
      enumerable: true,
      writable: true,
      value: function value(reach) {
        if (_this._reach !== reach) {
          return true;
        }
        if (_this._isConnected !== _this._getConnection(reach)) {
          return true;
        }
        return false;
      }
    });
    Object.defineProperty(this, '_setReach', {
      enumerable: true,
      writable: true,
      value: function value(reach) {
        _this._reach = reach;
        _this._isConnected = _this._getConnection(reach);
      }
    });
    Object.defineProperty(this, '_getConnection', {
      enumerable: true,
      writable: true,
      value: function value(reach) {
        return reach !== 'none' && reach !== 'unknown';
      }
    });
    Object.defineProperty(this, '_setIsConnectionExpensive', {
      enumerable: true,
      writable: true,
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _reactNative.NetInfo.isConnectionExpensive();

                case 3:
                  _this._isConnectionExpensive = _context.sent;
                  _context.next = 9;
                  break;

                case 6:
                  _context.prev = 6;
                  _context.t0 = _context['catch'](0);

                  // err means that isConnectionExpensive is not supported in iOS
                  _this._isConnectionExpensive = null;

                case 9:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this, [[0, 6]]);
        }));

        return function value() {
          return _ref.apply(this, arguments);
        };
      }()
    });
    Object.defineProperty(this, '_setShouldInitUpdateReach', {
      enumerable: true,
      writable: true,
      value: function value(shouldUpdate) {
        _this._shouldInitUpdateReach = shouldUpdate;
      }
    });
    Object.defineProperty(this, '_init', {
      enumerable: true,
      writable: true,
      value: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          var connectionInfo;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _reactNative.NetInfo.getConnectionInfo();

                case 2:
                  connectionInfo = _context2.sent;

                  if (_this._shouldInitUpdateReach) {
                    _this._update(connectionInfo.type);
                  }

                case 4:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this);
        }));

        return function value() {
          return _ref2.apply(this, arguments);
        };
      }()
    });
    Object.defineProperty(this, '_update', {
      enumerable: true,
      writable: true,
      value: function value(reach) {
        if (_this._hasChanged(reach)) {
          _this._setReach(reach);
          _this._dispatch();
        }
      }
    });
    Object.defineProperty(this, '_dispatch', {
      enumerable: true,
      writable: true,
      value: function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return _this._setIsConnectionExpensive();

                case 2:
                  _this._callback({
                    online: _this._isConnected,
                    netInfo: {
                      isConnectionExpensive: _this._isConnectionExpensive,
                      reach: _this._reach
                    }
                  });

                case 3:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this);
        }));

        return function value() {
          return _ref3.apply(this, arguments);
        };
      }()
    });

    this._reach = null;
    this._isConnected = null;
    this._isConnectionExpensive = null;
    this._callback = callback;
    this._shouldInitUpdateReach = true;

    this._init();
    this._addListeners();
  }

  /**
   * Check props for changes
   * @param {string} reach - connection reachability.
   *     - Cross-platform: [none, wifi, cellular, unknown]
   *     - Android: [bluetooth, ethernet, wimax]
   * @returns {boolean} - Whether the connection reachability or the connection props have changed
   * @private
   */

  /**
   * Sets the connection reachability prop
   * @param {string} reach - connection reachability.
   *     - Cross-platform: [none, wifi, cellular, unknown]
   *     - Android: [bluetooth, ethernet, wimax]
   * @returns {void}
   * @private
   */

  /**
   * Gets the isConnected prop depending on the connection reachability's value
   * @param {string} reach - connection reachability.
   *     - Cross-platform: [none, wifi, cellular, unknown]
   *     - Android: [bluetooth, ethernet, wimax]
   * @returns {void}
   * @private
   */

  /**
   * Sets the isConnectionExpensive prop
   * @returns {Promise.<void>} Resolves to true if connection is expensive,
   * false if not, and null if not supported.
   * @private
   */

  /**
   * Sets the shouldInitUpdateReach flag
   * @param {boolean} shouldUpdate - Whether the init method should update the reach prop
   * @returns {void}
   * @private
   */

  /**
   * Fetches and sets the connection reachability and the isConnected props,
   * if neither of the AppState and NetInfo event listeners have been called
   * @returns {Promise.<void>} Resolves when the props have been
   * initialized and update.
   * @private
   */

  /**
   * Check changes on props and store and dispatch if neccesary
   * @param {string} reach - connection reachability.
   *     - Cross-platform: [none, wifi, cellular, unknown]
   *     - Android: [bluetooth, ethernet, wimax]
   * @returns {void}
   * @private
   */


  (0, _createClass3.default)(DetectNetwork, [{
    key: '_addListeners',


    /**
     * Adds listeners for when connection reachability and app state changes to update props
     * @returns {void}
     * @private
     */
    value: function _addListeners() {
      var _this2 = this;

      _reactNative.NetInfo.addEventListener('connectionChange', function (connectionInfo) {
        _this2._setShouldInitUpdateReach(false);
        _this2._update(connectionInfo.type);
      });
      _reactNative.AppState.addEventListener('change', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var connectionInfo;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this2._setShouldInitUpdateReach(false);
                _context4.next = 3;
                return _reactNative.NetInfo.getConnectionInfo();

              case 3:
                connectionInfo = _context4.sent;

                _this2._update(connectionInfo.type);

              case 5:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this2);
      })));
    }

    /**
     * Executes the given callback to update redux's store with the new internal props
     * @returns {Promise.<void>} Resolves after fetching the isConnectionExpensive
     * and dispatches actions
     * @private
     */

  }]);
  return DetectNetwork;
}(); // eslint-disable-line


var isLegacy = typeof _reactNative.NetInfo.getConnectionInfo === 'undefined';

exports.default = function (callback) {
  return isLegacy ? new _detectNetworkNative2.default(callback) : new DetectNetwork(callback);
};