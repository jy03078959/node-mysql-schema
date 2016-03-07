'use strict'

const inherits = require('util').inherits
const BaseType = require('./base')

module.exports = DateType
function DateType () {
  BaseType.call(this)
}
inherits(DateType, BaseType)

DateType.prototype.encode = function (date) {
  if (!(date instanceof Date)) return 0
  return Number.isFinite(date.getTime()) ? Math.round(date.getTime() / 1000) : 0
}

DateType.prototype.decode = function (number) {
  let date = new Date()
  date.setTime(number * 1000)
  return date
}

DateType.prototype.getDefault = function () {
  return new Date()
}
