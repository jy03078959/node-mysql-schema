'use strict'

const DB = require('./db')
module.exports = Model
module.exports.DB = DB
module.exports.Schema = require('./schema')

function Model (dbconnection, options) {
  if (!(this instanceof Model))
    return new Model(dbconnection, options)

  this.db = new DB(dbconnection, options)
  this._models = {}
}

Model.prototype.loadSchema = function (schema) {
  this._models[schema.table] = schema
  schema.db = this.db
}

Model.prototype.model = function (name) {
  let result = this._models[name]
  return result
}
