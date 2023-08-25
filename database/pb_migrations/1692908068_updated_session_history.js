/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1ihmn4wlhlgzih6")

  collection.name = "sessionHistory"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dmzf1itw",
    "name": "experienceGained",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1ihmn4wlhlgzih6")

  collection.name = "session_history"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dmzf1itw",
    "name": "experience_gained",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
