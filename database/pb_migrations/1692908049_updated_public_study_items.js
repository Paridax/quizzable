/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uoz001xmfamfmxp")

  collection.name = "publicStudyItems"
  collection.options = {
    "query": "SELECT\n  card.id as id,\n  card.quizzable,\n  card.a2,\n  card.a3,\n  card.a4,\n  card.created,\n  card.definitionA1,\n  card.image,\n  card.position,\n  card.termOrQuestion,\n  card.shownAnswers,\n  card.timeSeconds,\n  card.type,\n  card.updated\nFROM studyItems AS card\nGROUP BY card.id, card.quizzable, card.a2, card.a3, card.a4, card.created, card.definitionA1, card.image, card.position, card.termOrQuestion, card.shownAnswers, card.timeSeconds, card.type;"
  }

  // remove
  collection.schema.removeField("upr2icca")

  // remove
  collection.schema.removeField("opzgngtx")

  // remove
  collection.schema.removeField("7lod4y9v")

  // remove
  collection.schema.removeField("kkwrhlme")

  // remove
  collection.schema.removeField("m4krn5gi")

  // remove
  collection.schema.removeField("vheoeltg")

  // remove
  collection.schema.removeField("0fjkrwyi")

  // remove
  collection.schema.removeField("4xxjzpph")

  // remove
  collection.schema.removeField("oq4yzcoz")

  // remove
  collection.schema.removeField("kriif4te")

  // remove
  collection.schema.removeField("m5g7ng0n")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kly01b8t",
    "name": "quizzable",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "x28fn9icpmfg9gs",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "title",
        "id"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qs0o11tb",
    "name": "a2",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cn7ndrgr",
    "name": "a3",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "67hj15kf",
    "name": "a4",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "t2jmrhbm",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pr1fy9zt",
    "name": "image",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6gvrglde",
    "name": "position",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jyu92a9i",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0wnys3zb",
    "name": "shownAnswers",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 2,
      "max": 4
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w3hq4izx",
    "name": "timeSeconds",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 999
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ou1iz6t0",
    "name": "type",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "card",
        "single",
        "multi",
        "order",
        "text"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uoz001xmfamfmxp")

  collection.name = "public_study_items"
  collection.options = {
    "query": "SELECT\n  card.id as id,\n  card.quizzable,\n  card.a2,\n  card.a3,\n  card.a4,\n  card.created,\n  card.definition_a1,\n  card.image,\n  card.position,\n  card.term_or_question,\n  card.shown_answers,\n  card.time_seconds,\n  card.type,\n  card.updated\nFROM study_items AS card\nGROUP BY card.id, card.quizzable, card.a2, card.a3, card.a4, card.created, card.definition_a1, card.image, card.position, card.term_or_question, card.shown_answers, card.time_seconds, card.type;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "upr2icca",
    "name": "quizzable",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "x28fn9icpmfg9gs",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "title",
        "id"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "opzgngtx",
    "name": "a2",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7lod4y9v",
    "name": "a3",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kkwrhlme",
    "name": "a4",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "m4krn5gi",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vheoeltg",
    "name": "image",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0fjkrwyi",
    "name": "position",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4xxjzpph",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oq4yzcoz",
    "name": "shown_answers",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 2,
      "max": 4
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kriif4te",
    "name": "time_seconds",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 999
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "m5g7ng0n",
    "name": "type",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "card",
        "single",
        "multi",
        "order",
        "text"
      ]
    }
  }))

  // remove
  collection.schema.removeField("kly01b8t")

  // remove
  collection.schema.removeField("qs0o11tb")

  // remove
  collection.schema.removeField("cn7ndrgr")

  // remove
  collection.schema.removeField("67hj15kf")

  // remove
  collection.schema.removeField("t2jmrhbm")

  // remove
  collection.schema.removeField("pr1fy9zt")

  // remove
  collection.schema.removeField("6gvrglde")

  // remove
  collection.schema.removeField("jyu92a9i")

  // remove
  collection.schema.removeField("0wnys3zb")

  // remove
  collection.schema.removeField("w3hq4izx")

  // remove
  collection.schema.removeField("ou1iz6t0")

  return dao.saveCollection(collection)
})
