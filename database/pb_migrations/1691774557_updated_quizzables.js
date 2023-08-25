/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x28fn9icpmfg9gs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e12yzokh",
    "name": "study_items",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "rxeip9x33v50jly",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x28fn9icpmfg9gs")

  // remove
  collection.schema.removeField("e12yzokh")

  return dao.saveCollection(collection)
})
