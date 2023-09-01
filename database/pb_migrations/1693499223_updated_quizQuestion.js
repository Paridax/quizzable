/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eql4ed3tyfiimiz")

  collection.updateRule = "@request.auth.id = user.id && answered = true && answerTime > 0"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eql4ed3tyfiimiz")

  collection.updateRule = null

  return dao.saveCollection(collection)
})
