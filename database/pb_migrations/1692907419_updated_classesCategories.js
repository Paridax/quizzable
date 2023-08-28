/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f2vm38c2983h921")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "szgis5jk",
    "name": "displayName",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": 25,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f2vm38c2983h921")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "szgis5jk",
    "name": "display_name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": 25,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
