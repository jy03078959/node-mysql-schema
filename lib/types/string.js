'use strict'

const inherits = require('util').inherits
const BaseType = require('./base')

module.exports = StringType
function StringType () {
  BaseType.call(this)
}
inherits(StringType, BaseType)

StringType.prototype.encode = function (message) {
  return message !== null && message !== undefined ? String(message) : ''
}

StringType.prototype.decode = function (message) {
  return message !== null && message !== undefined ? String(message) : ''
}

StringType.prototype.getDefault = function () {
  return ''
}
