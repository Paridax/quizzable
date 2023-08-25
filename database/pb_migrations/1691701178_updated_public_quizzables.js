/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g8m8m35b4uah7c0")

  collection.listRule = ""

  // remove
  collection.schema.removeField("1drtk5yg")

  // remove
  collection.schema.removeField("ozxsz03x")

  // remove
  collection.schema.removeField("vdetixda")

  // remove
  collection.schema.removeField("kv6rxnth")

  // remove
  collection.schema.removeField("w22tfqk7")

  // remove
  collection.schema.removeField("m20iaq37")

  // remove
  collection.schema.removeField("7g2ntlv9")

  // remove
  collection.schema.removeField("e8obyzz7")

  // remove
  collection.schema.removeField("wvsfxudr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cvqzd6rc",
    "name": "author",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "username"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wi62bowj",
    "name": "title",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": 50,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "v7hlyxwy",
    "name": "description",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 200,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fpuzlxwr",
    "name": "tags",
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
    "id": "jajnppic",
    "name": "type",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "quiz",
        "card"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1rnsm8di",
    "name": "verified",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hejyjsl5",
    "name": "visibility",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "public",
        "unlisted",
        "private"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6foevuu9",
    "name": "draft",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ivsocaro",
    "name": "likes",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g8m8m35b4uah7c0")

  collection.listRule = null

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1drtk5yg",
    "name": "author",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "username"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ozxsz03x",
    "name": "title",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": 50,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vdetixda",
    "name": "description",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 200,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kv6rxnth",
    "name": "tags",
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
    "id": "w22tfqk7",
    "name": "type",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "quiz",
        "card"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "m20iaq37",
    "name": "verified",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7g2ntlv9",
    "name": "visibility",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "public",
        "unlisted",
        "private"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e8obyzz7",
    "name": "draft",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wvsfxudr",
    "name": "likes",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // remove
  collection.schema.removeField("cvqzd6rc")

  // remove
  collection.schema.removeField("wi62bowj")

  // remove
  collection.schema.removeField("v7hlyxwy")

  // remove
  collection.schema.removeField("fpuzlxwr")

  // remove
  collection.schema.removeField("jajnppic")

  // remove
  collection.schema.removeField("1rnsm8di")

  // remove
  collection.schema.removeField("hejyjsl5")

  // remove
  collection.schema.removeField("6foevuu9")

  // remove
  collection.schema.removeField("ivsocaro")

  return dao.saveCollection(collection)
})
