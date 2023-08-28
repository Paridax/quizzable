/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g8m8m35b4uah7c0")

  collection.options = {
    "query": "SELECT\n  q.id as id,\n  q.author,\n  q.created,\n  q.title,\n  q.description,\n  q.tags,\n  q.type,\n  q.verified,\n  q.visibility,\n  q.draft,\n  q.study_items,\n  COUNT(likes_table.quizzable) AS likes,\n  COUNT(views.quizzable) AS views,\n  COUNT(cards.quizzable) AS card_count\nFROM quizzables AS q\nLEFT JOIN likes AS likes_table ON likes_table.quizzable = q.id\nLEFT JOIN quizzable_views AS views ON views.quizzable = q.id\nLEFT JOIN study_items AS cards ON cards.quizzable = q.id\nGROUP BY q.id, q.author, q.created, q.title, q.tags, q.type, q.verified, q.visibility, q.draft, q.study_items;"
  }

  // remove
  collection.schema.removeField("44xi3xfp")

  // remove
  collection.schema.removeField("vrbsmvm8")

  // remove
  collection.schema.removeField("aabdwbqq")

  // remove
  collection.schema.removeField("ldikhw8c")

  // remove
  collection.schema.removeField("fgyxg6kb")

  // remove
  collection.schema.removeField("rkprrpv0")

  // remove
  collection.schema.removeField("gsghfxmo")

  // remove
  collection.schema.removeField("4inv5snu")

  // remove
  collection.schema.removeField("jpwfh9gh")

  // remove
  collection.schema.removeField("dxgh6ej1")

  // remove
  collection.schema.removeField("ceb2vdzd")

  // remove
  collection.schema.removeField("9x6pve59")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rmuoxqi4",
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
    "id": "evzvwitd",
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
    "id": "fwzfazi7",
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
    "id": "stzg1wbv",
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
    "id": "7x4nagfl",
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
    "id": "fq6ybfzy",
    "name": "verified",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "itlgt60j",
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
    "id": "zeee7rlz",
    "name": "draft",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tuc0cw7f",
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
    "id": "k3ashoru",
    "name": "likes",
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
    "id": "qt7dlkyl",
    "name": "views",
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
    "id": "bligxnmx",
    "name": "card_count",
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

  collection.options = {
    "query": "SELECT\n  q.id as id,\n  q.author,\n  q.created,\n  q.title,\n  q.description,\n  q.tags,\n  q.type,\n  q.verified,\n  q.visibility,\n  q.draft,\n  q.study_items,\n  COALESCE(likes.likes_count, 0) AS likes,\n  COALESCE(views.views_count, 0) AS views,\n  COALESCE(cards.card_count, 0) AS card_count\nFROM quizzables AS q\nLEFT JOIN (\n  SELECT quizzable, COUNT(*) AS likes_count\n  FROM likes\n  GROUP BY quizzable\n) AS likes ON q.id = likes.quizzable\nLEFT JOIN (\n  SELECT quizzable, COUNT(*) AS views_count\n  FROM quizzable_views\n  GROUP BY quizzable\n) AS views ON q.id = views.quizzable\nLEFT JOIN (\n  SELECT quizzable, COUNT(*) AS card_count\n  FROM study_items\n  GROUP BY quizzable\n) AS cards ON q.id = cards.quizzable;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "44xi3xfp",
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
    "id": "vrbsmvm8",
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
    "id": "aabdwbqq",
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
    "id": "ldikhw8c",
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
    "id": "fgyxg6kb",
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
    "id": "rkprrpv0",
    "name": "verified",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gsghfxmo",
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
    "id": "4inv5snu",
    "name": "draft",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jpwfh9gh",
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
    "id": "dxgh6ej1",
    "name": "likes",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ceb2vdzd",
    "name": "views",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9x6pve59",
    "name": "card_count",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("rmuoxqi4")

  // remove
  collection.schema.removeField("evzvwitd")

  // remove
  collection.schema.removeField("fwzfazi7")

  // remove
  collection.schema.removeField("stzg1wbv")

  // remove
  collection.schema.removeField("7x4nagfl")

  // remove
  collection.schema.removeField("fq6ybfzy")

  // remove
  collection.schema.removeField("itlgt60j")

  // remove
  collection.schema.removeField("zeee7rlz")

  // remove
  collection.schema.removeField("tuc0cw7f")

  // remove
  collection.schema.removeField("k3ashoru")

  // remove
  collection.schema.removeField("qt7dlkyl")

  // remove
  collection.schema.removeField("bligxnmx")

  return dao.saveCollection(collection)
})
