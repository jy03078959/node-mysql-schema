'use strict'

const inherits = require('util').inherits
const BaseType = require('./base')

module.exports = ObjectType
function ObjectType () {
  BaseType.call(this)
}
inherits(ObjectType, BaseType)

ObjectType.prototype.encode = function (object) {
  return object
}

ObjectType.prototype.decode = function (object) {
  return object
}

ObjectType.prototype.getDefault = function () {
  return ''
}
