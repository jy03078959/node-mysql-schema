'use strict'

const inherits = require('util').inherits
const BaseType = require('./base')

module.exports = EnumType
function EnumType (baseJson) {
  BaseType.call(this)
  this._baseJson = baseJson
}
inherits(EnumType, BaseType)

EnumType.prototype.encode = function (obj) {
  return this._baseJson[obj]
}

EnumType.prototype.decode = function (json) {
  return decode(this._baseJson, JSON.parse(json) || {})
}

EnumType.prototype.getDefault = function () {
  return {}
}
