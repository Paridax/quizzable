/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qr4q1oi0t0rco41")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "haor4z3n",
    "name": "userIsTaking",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qr4q1oi0t0rco41")

  // remove
  collection.schema.removeField("haor4z3n")

  return dao.saveCollection(collection)
})
