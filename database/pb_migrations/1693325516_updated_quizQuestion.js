/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eql4ed3tyfiimiz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "p7olgvrm",
    "name": "quiz",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "qr4q1oi0t0rco41",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eql4ed3tyfiimiz")

  // remove
  collection.schema.removeField("p7olgvrm")

  return dao.saveCollection(collection)
})
