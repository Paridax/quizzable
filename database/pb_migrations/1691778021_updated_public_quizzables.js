/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g8m8m35b4uah7c0")

  collection.options = {
    "query": "SELECT\n  q.id AS id,\n  q.author,\n  q.created,\n  q.title,\n  q.description,\n  q.tags,\n  q.type,\n  q.verified,\n  q.visibility,\n  q.draft,\n  q.study_items,\n  (SELECT COUNT(*) FROM likes WHERE quizzable = q.id) AS likes,\n  (SELECT COUNT(*) FROM quizzable_views WHERE quizzable = q.id) AS views,\n  (SELECT COUNT(*) FROM study_items WHERE quizzable = q.id) AS card_count\nFROM quizzables AS q;"
  }

  // remove
  collection.schema.removeField("pvhxjahz")

  // remove
  collection.schema.removeField("b52i7gan")

  // remove
  collection.schema.removeField("slpng5pe")

  // remove
  collection.schema.removeField("7dssqslq")

  // remove
  collection.schema.removeField("01vkajvw")

  // remove
  collection.schema.removeField("oc6xx7ed")

  // remove
  collection.schema.removeField("nfouht5b")

  // remove
  collection.schema.removeField("zgadpnqo")

  // remove
  collection.schema.removeField("echp54ja")

  // remove
  collection.schema.removeField("bphwab58")

  // remove
  collection.schema.removeField("qmizgmmd")

  // remove
  collection.schema.removeField("xpstegd2")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g8m8m35b4uah7c0")

  collection.options = {
    "query": "SELECT\n  q.id AS id,\n  q.author,\n  q.created,\n  q.title,\n  q.description,\n  q.tags,\n  q.type,\n  q.verified,\n  q.visibility,\n  q.draft,\n  q.study_items,\n  1231231235 AS likes,\n  (SELECT COUNT(*) FROM quizzable_views WHERE quizzable = q.id) AS views,\n  (SELECT COUNT(*) FROM study_items WHERE quizzable = q.id) AS card_count\nFROM quizzables AS q;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pvhxjahz",
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
    "id": "b52i7gan",
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
    "id": "slpng5pe",
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
    "id": "7dssqslq",
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
    "id": "01vkajvw",
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
    "id": "oc6xx7ed",
    "name": "verified",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nfouht5b",
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
    "id": "zgadpnqo",
    "name": "draft",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "echp54ja",
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
    "id": "bphwab58",
    "name": "likes",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qmizgmmd",
    "name": "views",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xpstegd2",
    "name": "card_count",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

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

  return dao.saveCollection(collection)
})
