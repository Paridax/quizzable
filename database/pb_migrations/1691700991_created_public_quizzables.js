/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "g8m8m35b4uah7c0",
    "created": "2023-08-10 20:56:31.797Z",
    "updated": "2023-08-10 20:56:31.797Z",
    "name": "public_quizzables",
    "type": "view",
    "system": false,
    "schema": [
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
        "system": false,
        "id": "koj2ze5v",
        "name": "verified",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT\n  q.id as id,\n  q.author,\n  q.created,\n  q.title,\n  q.tags,\n  q.type,\n  q.verified,\n  COUNT(likes.quizzable) AS likes\nFROM quizzables AS q\nLEFT JOIN likes AS likes ON likes.quizzable = q.id\nGROUP BY q.id, q.author, q.created, q.title, q.tags, q.type, q.verified;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("g8m8m35b4uah7c0");

  return dao.deleteCollection(collection);
})
