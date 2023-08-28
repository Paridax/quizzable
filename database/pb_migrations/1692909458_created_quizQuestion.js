/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "eql4ed3tyfiimiz",
    "created": "2023-08-24 20:37:38.715Z",
    "updated": "2023-08-24 20:37:38.715Z",
    "name": "quizQuestion",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wbj9ctgk",
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
        "id": "20kyvpki",
        "name": "studyItem",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "rxeip9x33v50jly",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "6gc331ez",
        "name": "answered",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "j4jawo5f",
        "name": "correct",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "8kiqzgyt",
        "name": "answerTime",
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
    "createRule": "@request.auth.id = user.id && @request.data.answered = false && @request.data.correct = false",
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("eql4ed3tyfiimiz");

  return dao.deleteCollection(collection);
})
