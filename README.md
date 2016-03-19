mysql-schema (temp name)
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
### Collection.collection(table)

### DB
### DB.contruct(dbconnection, options)
- options
  - prefix Default null

### DB.getTableName(table)
return table name in mysql form

### DB.find *(table, conds, options)
find result with given conditions.
- table: *String* table name
- conds: *Object* filter conditions, see [Conditions](#Conditions)
- options: *Object*
  - fields: *String* fields retrieved by Mysql. Default `*`
  - joins: *Array* array of Join, see [Join](#Join)

### DB.update *(table, id, object, options)

### DB.insert *(table, object, options)

### DB.makeConditionField *(table, conds, joiner)
- table: *String* table name
- conds: *Object* filter conditions, see [Conditions](#Conditions)
- joiner: *String* `AND` or `OR`

### Conditions
Condtion object with `key` and `value`. `value` will be escaped. `key` format as `column_name$operation`. Operations(case insensitive) contains: `= > >= < <= <> != LIKE IN AND OR`.

- if operation is `=`, `$` and operation can be omit.
- if operation is a joiner (`AND` or `OR`), column_name will be omit and value should be a object.
- if operation is `IN`, value should be an array of possible values.
- if operation is `LIKE`, value will be add '%' at first and last.

examples from conds to sql format equivalent:
- {A:a, B:b} => WHERE A=a AND B=b
- {$OR:{A:a, B:b}, C:c} => WHERE (A=a OR B=b) AND C=c
- {A$IN:[a1,a2,a3], B$>: b, C$LIKE: c} => WHERE A in (a1,a2,a3) AND B>-b AND C LIKE %c%

###Join
TODO: It is too complicated to explain this. This API is very unstable now. There is lots of work to do.
- join.cond *Object* Conditions on join sql
- join.type *String* `LEFT` or `RIGHT` or `INNER`. Default: `INNER`

### Schema
### Schema.construct(table, schema, options)
### Schema.find
### Schema.load
### Schema.update
### Schema.insert
### Schema.delete
TODO
