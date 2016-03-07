'use strict'

const _ = require('lodash')
const debug = require('debug')('schema')
const types = require('./types')

module.exports = Schema
function Schema (table, schemas, options) {
  options = options || {}
  this.db = options.db
  this.table = table
  this._schemas = schemas
}

Schema.types = _.clone(types)

Schema.prototype.decodeSchema = function (object) {
  let result = {}
  for (let key in object) {
    if (!this._schemas[key]) continue
    if (object[key] !== undefined) {
      result[key] = this._schemas[key].decode(object[key])
    } else if (typeof this._schemas[key].getDefault === 'function') {
      result[key] = this._schemas[key].getDefault()
    }
  }
  return result
}

Schema.prototype.encodeSchema = function (object) {
  let result = {}
  for (let key in object) {
    let field, op
    let tmp = key.split('$')
    field = tmp[0]
    op = tmp[1]
    if (!field && op) {
      result[key] = this.encodeSchema(object[key])
    } else if (!this._schemas[field]) {
      continue
    } else if (object[key] !== undefined) {
      result[key] = this._schemas[field].encode(object[key])
    } else if (typeof this._schemas[field].getDefault === 'function') {
      result[key] = this._schemas[field].encode(this._schemas[field].getDefault())
    } else {
      debug('warning: no match encode for key', key)
    }
  }
  return result
}

Schema.prototype.load = function *(cond, options) {
  options = options || {}
  options.page = 1
  options.pagesize = 1
  return (yield this.find(cond, options))[0]
}

Schema.prototype.find = function *(cond, options) {
  cond = this.encodeSchema(cond)
  let result = yield this.db.find(this.table, cond, options)
  return result.map(function (one) {
    return this.decodeSchema(one)
  }.bind(this))
}

Schema.prototype.update = function *(id, object, options) {
  let _object = this.encodeSchema(object)
  let result = yield this.db.update(this.table, id, _object, options)
  return result
}

Schema.prototype.insert = function *(object, options) {
  let _object = this.encodeSchema(object)
  let result = yield this.db.insert(this.table, _object, options)
  object.id = result[0].insertId
  return object
}
