/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "qr4q1oi0t0rco41",
    "created": "2023-08-24 20:29:59.329Z",
    "updated": "2023-08-24 20:29:59.329Z",
    "name": "soloQuizzes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fja6kny1",
        "name": "quizzable",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "x28fn9icpmfg9gs",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": [
            "title"
          ]
        }
      },
      {
        "system": false,
        "id": "rrmo1oso",
        "name": "user",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": [
            "username"
          ]
        }
      },
      {
        "system": false,
        "id": "suvq7gbn",
        "name": "questions",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "rxeip9x33v50jly",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "tltz3uco",
        "name": "currentQuestion",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": null
        }
      },
      {
        "system": false,
        "id": "kt2qmiob",
        "name": "completedQuiz",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "t6wewjxz",
        "name": "answers",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("qr4q1oi0t0rco41");

  return dao.deleteCollection(collection);
})
