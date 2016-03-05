'use strict'

const DB = require('./db')
module.exports = Model
module.exports.DB = DB
module.exports.Schema = require('./lib/schema')

function Model (options) {
  if (!(this instanceof Model)) {
    return new Model(options)
  }

  let db = options.db
  if (!(db instanceof DB)) {
    db = new DB(db)
  }

  this.db = db
  this.models = {}
}

Model.prototype.loadSchema = function (schema) {
  this.models[schema.table] = schema
  schema.db = this.db
}
