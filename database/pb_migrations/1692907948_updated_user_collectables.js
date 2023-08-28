/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("enyvy5y9t7faih3")

  collection.name = "userCollectables"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "92fa3kmp",
    "name": "userWithCollectable",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("enyvy5y9t7faih3")

  collection.name = "user_collectables"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "92fa3kmp",
    "name": "user_with_collectable",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
