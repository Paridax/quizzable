/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tparxvjlw48it6u")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rj8x9edt",
    "name": "quizzable",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "x28fn9icpmfg9gs",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tparxvjlw48it6u")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rj8x9edt",
    "name": "quizzable",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "x28fn9icpmfg9gs",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
