'use strict'

const inherits = require('util').inherits
const BaseType = require('../base')

module.exports = NumberType
let NumberType = function () {
  BaseType.call(this)
}
inherits(NumberType, BaseType)

NumberType.prototype.encode = function (number) {
  return Number.isFinite(Number(number)) ? Number(number) : 0
}

NumberType.prototype.decode = function (number) {
  return Number.isFinite(Number(number)) ? Number(number) : 0
}

NumberType.prototype.getDefault = function () {
  return 0
}
