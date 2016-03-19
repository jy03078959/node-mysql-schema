'use strict'

const DB = require('./db')
module.exports = Collection
module.exports.DB = DB
module.exports.Schema = require('./schema')

function Collection (dbconnection, options) {
  if (!(this instanceof Collection)) return new Collection(dbconnection, options)

  this.db = new DB(dbconnection, options)
  this._models = {}
}

Collection.prototype.loadSchema = function (schema) {
  this._models[schema.table] = schema
  schema.db = this.db
}

Collection.prototype.collection = function (name) {
  let result = this._models[name]
  return result
}
