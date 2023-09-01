/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eql4ed3tyfiimiz")

  collection.listRule = "user.id = @request.auth.id"
  collection.viewRule = "user.id = @request.auth.id"
  collection.createRule = "user.id = @request.auth.id && answered = false && correct = false"
  collection.updateRule = "user.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eql4ed3tyfiimiz")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
