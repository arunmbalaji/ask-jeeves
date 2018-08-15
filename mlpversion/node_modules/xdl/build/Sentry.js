'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.logError = logError;
exports.captureException = captureException;

var _Config;

function _load_Config() {
  return _Config = _interopRequireDefault(require('./Config'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Raven;
let SENTRY_DSN;

if (global.XMLHttpRequest) {
  // use browser version and DSN for xde
  Raven = require('raven-js');
  SENTRY_DSN = 'https://8554f14d112d4ed4b0558154762760ef@sentry.io/194120';
} else {
  // use node version and DSN for crna and exp
  Raven = require('raven');
  SENTRY_DSN = `
    https://8554f14d112d4ed4b0558154762760ef:bae5673d5e5243abac5563d70861b5d8@sentry.io/194120
  `;
}

Raven.config(SENTRY_DSN).install();

function logError(message, options) {
  // send error to Sentry
  // add `testing: true` to tags to avoid sending an email when testing
  Raven.captureMessage(message, getOptions(options));
}

function captureException(ex, options) {
  Raven.captureException(ex, getOptions(options));
}

function getOptions(options = {}) {
  return _extends({}, options, {
    tags: _extends({}, options.tags, {
      developerTool: (_Config || _load_Config()).default.developerTool,
      offline: (_Config || _load_Config()).default.offline
    })
  });
}
//# sourceMappingURL=__sourcemaps__/Sentry.js.map
