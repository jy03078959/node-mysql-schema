mysql-collection (temp name)
===========

## Intrduction
TODO

## Usage
```
const mysql = require('mysql')
let pool = module.exports = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'aaaa1111',
  database: 'sample'
})

pool.getConnection(function (err) {
  if (err) throw err
})

const Collection = require('../index')
const Schema = Collection.Schema
let collection = new Collection({
  db: pool
})

let sampleSchema = new Schema('sample', {
  id: Schema.types.number,
  number: Schema.types.number,
  string: Schema.types.string,
  date: Schema.types.date,
  json: Schema.types.json,
  extra: Schema.types.extra({
    string: Schema.types.string,
    number: Schema.types.number,
    object: {}
  })
})

collection.loadSchema(sampleSchema)
let sample = collection.model('sample')

```

## API

### Collection
### Collection.contruct(dbconnection, options)
- options: see DB.construct

### Collection.loadSchema(schema)
### Collection.model

### DB
### DB.contruct(dbconnection, options)
- options
  - prefix Default `null`

### Schema
### Schema.construct(table, schema, options)
### Schema.find
### Schema.load
### Schema.update
### Schema.insert
### Schema.delete
TODO
