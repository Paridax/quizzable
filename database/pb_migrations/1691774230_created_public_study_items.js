/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "uoz001xmfamfmxp",
    "created": "2023-08-11 17:17:10.990Z",
    "updated": "2023-08-11 17:17:10.990Z",
    "name": "public_study_items",
    "type": "view",
    "system": false,
    "schema": [
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT\n  card.id as id,\n  card.quizzable,\n  card.a2,\n  card.a3,\n  card.a4,\n  card.created,\n  card.definition_a1,\n  card.image,\n  card.position,\n  card.term_or_question,\n  card.shown_answers,\n  card.time_seconds,\n  card.type,\n  card.updated\nFROM study_items AS card\nGROUP BY card.id, card.quizzable, card.a2, card.a3, card.a4, card.created, card.definition_a1, card.image, card.position, card.term_or_question, card.shown_answers, card.time_seconds, card.type;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("uoz001xmfamfmxp");

  return dao.deleteCollection(collection);
})
