/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eql4ed3tyfiimiz")

  collection.createRule = "@request.auth.id = user.id && answered = false && correct = false"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eql4ed3tyfiimiz")

  collection.createRule = null

  return dao.saveCollection(collection)
})
