/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qr4q1oi0t0rco41")

  // remove
  collection.schema.removeField("t6wewjxz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xviaexsg",
    "name": "completedQuestions",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "eql4ed3tyfiimiz",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qr4q1oi0t0rco41")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "t6wewjxz",
    "name": "answers",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // remove
  collection.schema.removeField("xviaexsg")

  return dao.saveCollection(collection)
})
