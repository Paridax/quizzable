/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5h52vaw79b1w0o9")

  collection.name = "publicUsers"

  // remove
  collection.schema.removeField("nbewnvge")

  // remove
  collection.schema.removeField("yiu4jrm4")

  // remove
  collection.schema.removeField("mn9wt8uu")

  // remove
  collection.schema.removeField("q0pg2wh5")

  // remove
  collection.schema.removeField("mpav08zq")

  // remove
  collection.schema.removeField("9czmie4g")

  // remove
  collection.schema.removeField("sktusci5")

  // remove
  collection.schema.removeField("qlxkheon")

  // remove
  collection.schema.removeField("axxcj3uq")

  // remove
  collection.schema.removeField("3lbdzhzi")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e03zx3n0",
    "name": "username",
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
    "id": "m27lqilr",
    "name": "displayName",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": 30,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x16vuhig",
    "name": "avatar",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/gif",
        "image/webp"
      ],
      "thumbs": null,
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "u0grkahn",
    "name": "bio",
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
    "id": "tf3daeo3",
    "name": "experience",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rahqjcjc",
    "name": "verifiedCreator",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o3gvko03",
    "name": "supporterLevel",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "standard",
        "silver",
        "gold",
        "platinum"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fcdzyrja",
    "name": "authorization",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "user",
        "moderator",
        "admin"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fzgfbsbs",
    "name": "followers",
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
    "id": "bn9wequv",
    "name": "following",
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
  const collection = dao.findCollectionByNameOrId("5h52vaw79b1w0o9")

  collection.name = "public_users"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nbewnvge",
    "name": "username",
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
    "id": "yiu4jrm4",
    "name": "displayName",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": 30,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mn9wt8uu",
    "name": "avatar",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/gif",
        "image/webp"
      ],
      "thumbs": null,
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q0pg2wh5",
    "name": "bio",
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
    "id": "mpav08zq",
    "name": "experience",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9czmie4g",
    "name": "verifiedCreator",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sktusci5",
    "name": "supporterLevel",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "standard",
        "silver",
        "gold",
        "platinum"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qlxkheon",
    "name": "authorization",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "user",
        "moderator",
        "admin"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "axxcj3uq",
    "name": "followers",
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
    "id": "3lbdzhzi",
    "name": "following",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // remove
  collection.schema.removeField("e03zx3n0")

  // remove
  collection.schema.removeField("m27lqilr")

  // remove
  collection.schema.removeField("x16vuhig")

  // remove
  collection.schema.removeField("u0grkahn")

  // remove
  collection.schema.removeField("tf3daeo3")

  // remove
  collection.schema.removeField("rahqjcjc")

  // remove
  collection.schema.removeField("o3gvko03")

  // remove
  collection.schema.removeField("fcdzyrja")

  // remove
  collection.schema.removeField("fzgfbsbs")

  // remove
  collection.schema.removeField("bn9wequv")

  return dao.saveCollection(collection)
})
