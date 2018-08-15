'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.NetworkError = NetworkError;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NetworkError(response, status) {
  this.name = 'NetworkError';
  this.status = status;
  this.response = response;
}

// $FlowFixMe

/* global fetch */

NetworkError.prototype = Error.prototype;

var tryParseJSON = function tryParseJSON(json) {
  if (!json) {
    return null;
  }
  try {
    return JSON.parse(json);
  } catch (e) {
    throw new Error('Failed to parse unexpected JSON response: ' + json);
  }
};

var getResponseBody = function getResponseBody(res) {
  var contentType = res.headers.get('content-type') || false;
  if (contentType && contentType.indexOf('json') >= 0) {
    return res.text().then(tryParseJSON);
  }
  return res.text();
};

// eslint-disable-next-line no-unused-vars

exports.default = function (effect, _action) {
  var url = effect.url,
      options = (0, _objectWithoutProperties3.default)(effect, ['url']);

  var headers = (0, _extends3.default)({ 'content-type': 'application/json' }, options.headers);
  return fetch(url, (0, _extends3.default)({}, options, { headers: headers })).then(function (res) {
    if (res.ok) {
      return getResponseBody(res);
    }
    return getResponseBody(res).then(function (body) {
      throw new NetworkError(body || '', res.status);
    });
  });
};