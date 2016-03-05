'use strict'

const inherits = require('util').inherits
const BaseType = require('../base')

module.exports = ExtraType
let ExtraType = function (baseJson) {
  BaseType.call(this)
  this._baseJson = baseJson
}
inherits(ExtraType, BaseType)

ExtraType.prototype.encode = function (json) {
  return JSON.stringify(encode(this._baseJson, json))
}

ExtraType.prototype.decode = function (json) {
  return decode(this._baseJson, JSON.parse(json) || {})
}

ExtraType.prototype.getDefault = function () {
  return {}
}

function encode (obj, json) {
  let result = {}
  for (let key in obj) {
    let objType = obj[key]
    let value = json[key]
    if (typeof objType.encode === 'function') {
      result[key] = objType.encode(value)
    } else if (typeof objType === 'object') {
      result[key] = encode(obj[key], value || {})
    }
  }
  return result
}

function decode (obj, json) {
  let result = {}
  for (let key in obj) {
    let objType = obj[key]
    let value = json[key]
    if (typeof objType.decode === 'function') {
      result[key] = objType.decode(value)
    } else if (typeof objType === 'object') {
      result[key] = decode(obj[key], value || {})
    }
  }
  return result
}
