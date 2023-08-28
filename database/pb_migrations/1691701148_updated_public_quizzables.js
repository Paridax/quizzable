/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g8m8m35b4uah7c0")

  collection.viewRule = ""
  collection.options = {
    "query": "SELECT\n  q.id as id,\n  q.author,\n  q.created,\n  q.title,\n  q.tags,\n  q.type,\n  q.verified,\n  q.visibility,\n  q.draft,\n  COUNT(likes.quizzable) AS likes\nFROM quizzables AS q\nLEFT JOIN likes AS likes ON likes.quizzable = q.id\nGROUP BY q.id, q.author, q.created, q.title, q.tags, q.type, q.verified;"
  }

  // remove
  collection.schema.removeField("dvsnaxx9")

  // remove
  collection.schema.removeField("bnmnrd2u")

  // remove
  collection.schema.removeField("rak67ahp")

  // remove
  collection.schema.removeField("59gj5xvw")

  // remove
  collection.schema.removeField("koj2ze5v")

  // remove
  collection.schema.removeField("lm2hei8z")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oyxwohpx",
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
    "id": "rmbrphew",
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
    "id": "l6wahg8k",
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
    "id": "ji1whdlz",
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
    "id": "vtjuxabd",
    "name": "verified",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "plulv66i",
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
    "id": "o2czfffh",
    "name": "draft",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kxztaptn",
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

  collection.viewRule = null
  collection.options = {
    "query": "SELECT\n  q.id as id,\n  q.author,\n  q.created,\n  q.title,\n  q.tags,\n  q.type,\n  q.verified,\n  COUNT(likes.quizzable) AS likes\nFROM quizzables AS q\nLEFT JOIN likes AS likes ON likes.quizzable = q.id\nGROUP BY q.id, q.author, q.created, q.title, q.tags, q.type, q.verified;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dvsnaxx9",
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
    "id": "bnmnrd2u",
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
    "id": "rak67ahp",
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
    "id": "59gj5xvw",
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
    "id": "koj2ze5v",
    "name": "verified",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lm2hei8z",
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
  collection.schema.removeField("oyxwohpx")

  // remove
  collection.schema.removeField("rmbrphew")

  // remove
  collection.schema.removeField("l6wahg8k")

  // remove
  collection.schema.removeField("ji1whdlz")

  // remove
  collection.schema.removeField("vtjuxabd")

  // remove
  collection.schema.removeField("plulv66i")

  // remove
  collection.schema.removeField("o2czfffh")

  // remove
  collection.schema.removeField("kxztaptn")

  return dao.saveCollection(collection)
})
