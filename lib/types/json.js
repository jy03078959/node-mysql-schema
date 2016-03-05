'use strict'

const inherits = require('util').inherits
const BaseType = require('../base')

module.exports = JsonType
let JsonType = function () {
  BaseType.call(this)
}
inherits(JsonType, BaseType)

JsonType.prototype.encode = function (json) {
  return JSON.stringify(json)
}

JsonType.prototype.decode = function (json) {
  try {
    return JSON.parse(json)
  } catch (e) {
    console.warn('JsonType decode error ', json)
    return null
  }
}

JsonType.prototype.getDefault = function () {
  return {}
}
