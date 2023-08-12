/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5h52vaw79b1w0o9")

  collection.options = {
    "query": "SELECT\n  u.id as id,\n  u.username,\n  u.created,\n  u.displayName,\n  u.avatar,\n  u.bio,\n  u.experience,\n  u.verifiedCreator,\n  u.supporterLevel,\n  u.authorization,\n  COUNT(f1.following) AS followers,\n  COUNT(f2.user) AS following\nFROM users AS u\nLEFT JOIN followers AS f1 ON f1.following = u.id\nLEFT JOIN followers AS f2 ON f2.user = u.id\nGROUP BY u.id, u.username, u.displayName, u.avatar, u.bio, u.experience, u.verifiedCreator, u.supporterLevel, u.authorization, u.created;"
  }

  // remove
  collection.schema.removeField("mijybfbr")

  // remove
  collection.schema.removeField("rrpbdzfy")

  // remove
  collection.schema.removeField("rmsbxcyx")

  // remove
  collection.schema.removeField("sv5hx9xb")

  // remove
  collection.schema.removeField("oiwtolgk")

  // remove
  collection.schema.removeField("qotpft2t")

  // remove
  collection.schema.removeField("uneqorn1")

  // remove
  collection.schema.removeField("djofxirg")

  // remove
  collection.schema.removeField("lp2y5zlc")

  // remove
  collection.schema.removeField("xoivc43j")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5h52vaw79b1w0o9")

  collection.options = {
    "query": "SELECT\n  u.username as id,\n  u.username,\n  u.created,\n  u.displayName,\n  u.avatar,\n  u.bio,\n  u.experience,\n  u.verifiedCreator,\n  u.supporterLevel,\n  u.authorization,\n  COUNT(f1.following) AS followers,\n  COUNT(f2.user) AS following\nFROM users AS u\nLEFT JOIN followers AS f1 ON f1.following = u.id\nLEFT JOIN followers AS f2 ON f2.user = u.id\nGROUP BY u.id, u.username, u.displayName, u.avatar, u.bio, u.experience, u.verifiedCreator, u.supporterLevel, u.authorization, u.created;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mijybfbr",
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
    "id": "rrpbdzfy",
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
    "id": "rmsbxcyx",
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
    "id": "sv5hx9xb",
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
    "id": "oiwtolgk",
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
    "id": "qotpft2t",
    "name": "verifiedCreator",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uneqorn1",
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
    "id": "djofxirg",
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
    "id": "lp2y5zlc",
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
    "id": "xoivc43j",
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

  return dao.saveCollection(collection)
})
