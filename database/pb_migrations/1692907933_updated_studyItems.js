/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rxeip9x33v50jly")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fgk4achp",
    "name": "termOrQuestion",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 100,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c5jgmmjf",
    "name": "definitionA1",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 100,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x3a1bh6p",
    "name": "timeSeconds",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 999
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mkzrmv77",
    "name": "correctAnswers",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 4,
      "values": [
        "1",
        "2",
        "3",
        "4"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lw3uikbm",
    "name": "shownAnswers",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 2,
      "max": 4
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rxeip9x33v50jly")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fgk4achp",
    "name": "term_or_question",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 100,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c5jgmmjf",
    "name": "definition_a1",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 100,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x3a1bh6p",
    "name": "time_seconds",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 999
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mkzrmv77",
    "name": "correct_answers",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 4,
      "values": [
        "1",
        "2",
        "3",
        "4"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lw3uikbm",
    "name": "shown_answers",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 2,
      "max": 4
    }
  }))

  return dao.saveCollection(collection)
})
