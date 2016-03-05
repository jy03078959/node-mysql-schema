'use strict'

const StringType = require('./string')
const NumberType = require('./number')
const DateType = require('./date')
const ExtraType = require('./extra')
const JsonType = require('./json')
const EnumType = require('./enum')
const BaseType = require('./base')

module.exports = {
  base: BaseType,
  string: new StringType(),
  number: new NumberType(),
  date: new DateType(),
  json: new JsonType(),
  extra: ExtraType,
  enum: EnumType
}
