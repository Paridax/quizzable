/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uoz001xmfamfmxp")

  collection.listRule = "@request.auth.id = quizzable.author.id  || (quizzable.visibility = \"public\" && quizzable.draft = false)"
  collection.viewRule = "@request.auth.id = quizzable.author.id  || (quizzable.visibility != \"private\" && quizzable.draft = false)"

  // remove
  collection.schema.removeField("2qpewlwv")

  // remove
  collection.schema.removeField("91le7vqi")

  // remove
  collection.schema.removeField("wovvvrij")

  // remove
  collection.schema.removeField("mqgitl6x")

  // remove
  collection.schema.removeField("r3ezfo48")

  // remove
  collection.schema.removeField("phnz754o")

  // remove
  collection.schema.removeField("nkfawesq")

  // remove
  collection.schema.removeField("ovfqanjg")

  // remove
  collection.schema.removeField("j9ov7q9d")

  // remove
  collection.schema.removeField("f5pjrbp8")

  // remove
  collection.schema.removeField("6idvweao")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uoz001xmfamfmxp")

  collection.listRule = null
  collection.viewRule = null

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2qpewlwv",
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
    "id": "91le7vqi",
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
    "id": "wovvvrij",
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
    "id": "mqgitl6x",
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
    "id": "r3ezfo48",
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
    "id": "phnz754o",
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
    "id": "nkfawesq",
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
    "id": "ovfqanjg",
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
    "id": "j9ov7q9d",
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
    "id": "f5pjrbp8",
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
    "id": "6idvweao",
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

  return dao.saveCollection(collection)
})
