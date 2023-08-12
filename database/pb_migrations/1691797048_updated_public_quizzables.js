/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g8m8m35b4uah7c0")

  collection.options = {
    "query": "SELECT\n  q.id AS id,\n  q.author,\n  q.created,\n  q.title,\n  q.description,\n  q.tags,\n  q.type,\n  q.verified,\n  q.visibility,\n  q.draft,\n  q.study_items,\n  12133 AS likes,\n  (SELECT COUNT(*) FROM quizzable_views WHERE quizzable = q.id) AS views,\n  (SELECT COUNT(*) FROM study_items WHERE quizzable = q.id) AS card_count\nFROM quizzables AS q;"
  }

  // remove
  collection.schema.removeField("kacl3bmq")

  // remove
  collection.schema.removeField("69zwsyab")

  // remove
  collection.schema.removeField("5npnfz2l")

  // remove
  collection.schema.removeField("mnlwaygu")

  // remove
  collection.schema.removeField("wxuy3qxq")

  // remove
  collection.schema.removeField("lwbout44")

  // remove
  collection.schema.removeField("kwe7wgga")

  // remove
  collection.schema.removeField("0f7jw1vi")

  // remove
  collection.schema.removeField("oc5ioblv")

  // remove
  collection.schema.removeField("vnoddeme")

  // remove
  collection.schema.removeField("uzp8wnp8")

  // remove
  collection.schema.removeField("aj6tviv0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eguzx7aq",
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
    "id": "wilyvdov",
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
    "id": "6zsr8ei5",
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
    "id": "nffvfglu",
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
    "id": "luhlhwwv",
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
    "id": "mbhywymv",
    "name": "verified",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gsmcbpq0",
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
    "id": "htu5qo1s",
    "name": "draft",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ogddzvi9",
    "name": "study_items",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "rxeip9x33v50jly",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": [
        "id",
        "quizzable"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "plvwsh0o",
    "name": "likes",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uv9z4zfc",
    "name": "views",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fz5d5mye",
    "name": "card_count",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g8m8m35b4uah7c0")

  collection.options = {
    "query": "SELECT\n  q.id AS id,\n  q.author,\n  q.created,\n  q.title,\n  q.description,\n  q.tags,\n  q.type,\n  q.verified,\n  q.visibility,\n  q.draft,\n  q.study_items,\n  (SELECT COUNT(*) FROM likes WHERE quizzable = q.id) AS likes,\n  (SELECT COUNT(*) FROM quizzable_views WHERE quizzable = q.id) AS views,\n  (SELECT COUNT(*) FROM study_items WHERE quizzable = q.id) AS card_count\nFROM quizzables AS q;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kacl3bmq",
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
    "id": "69zwsyab",
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
    "id": "5npnfz2l",
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
    "id": "mnlwaygu",
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
    "id": "wxuy3qxq",
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
    "id": "lwbout44",
    "name": "verified",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kwe7wgga",
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
    "id": "0f7jw1vi",
    "name": "draft",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oc5ioblv",
    "name": "study_items",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "rxeip9x33v50jly",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": [
        "id",
        "quizzable"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vnoddeme",
    "name": "likes",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uzp8wnp8",
    "name": "views",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "aj6tviv0",
    "name": "card_count",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("eguzx7aq")

  // remove
  collection.schema.removeField("wilyvdov")

  // remove
  collection.schema.removeField("6zsr8ei5")

  // remove
  collection.schema.removeField("nffvfglu")

  // remove
  collection.schema.removeField("luhlhwwv")

  // remove
  collection.schema.removeField("mbhywymv")

  // remove
  collection.schema.removeField("gsmcbpq0")

  // remove
  collection.schema.removeField("htu5qo1s")

  // remove
  collection.schema.removeField("ogddzvi9")

  // remove
  collection.schema.removeField("plvwsh0o")

  // remove
  collection.schema.removeField("uv9z4zfc")

  // remove
  collection.schema.removeField("fz5d5mye")

  return dao.saveCollection(collection)
})
