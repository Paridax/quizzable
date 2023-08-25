/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tparxvjlw48it6u")

  // remove
  collection.schema.removeField("ewhvktbz")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tparxvjlw48it6u")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ewhvktbz",
    "name": "anonymousID",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
