/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("uoz001xmfamfmxp");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "uoz001xmfamfmxp",
    "created": "2023-08-11 17:17:10.990Z",
    "updated": "2023-08-24 20:14:09.659Z",
    "name": "publicStudyItems",
    "type": "view",
    "system": false,
    "schema": [
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.id = quizzable.author.id  || (quizzable.visibility = \"public\" && quizzable.draft = false)",
    "viewRule": "@request.auth.id = quizzable.author.id  || (quizzable.visibility != \"private\" && quizzable.draft = false)",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT\n  card.id as id,\n  card.quizzable,\n  card.a2,\n  card.a3,\n  card.a4,\n  card.created,\n  card.definitionA1,\n  card.image,\n  card.position,\n  card.termOrQuestion,\n  card.shownAnswers,\n  card.timeSeconds,\n  card.type,\n  card.updated\nFROM studyItems AS card\nGROUP BY card.id, card.quizzable, card.a2, card.a3, card.a4, card.created, card.definitionA1, card.image, card.position, card.termOrQuestion, card.shownAnswers, card.timeSeconds, card.type;"
    }
  });

  return Dao(db).saveCollection(collection);
})
