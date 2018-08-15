"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toArray2 = require("babel-runtime/helpers/toArray");

var _toArray3 = _interopRequireDefault(_toArray2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */

function enqueue(array, item, context) {
  return [].concat((0, _toConsumableArray3.default)(array), [item]);
}

function dequeue(array, item, context) {
  var _array = (0, _toArray3.default)(array),
      rest = _array.slice(1);

  return rest;
}

function peek(array, item, context) {
  return array[0];
}

exports.default = {
  enqueue: enqueue,
  dequeue: dequeue,
  peek: peek
};