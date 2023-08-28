/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5lcoeljthnupbd0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ta2p2n1x",
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
  const collection = dao.findCollectionByNameOrId("5lcoeljthnupbd0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ta2p2n1x",
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
