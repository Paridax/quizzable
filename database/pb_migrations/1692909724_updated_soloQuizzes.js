/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qr4q1oi0t0rco41")

  collection.listRule = "@request.auth.id = user.id"
  collection.viewRule = "@request.auth.id = user.id"
  collection.createRule = "@request.auth.id = user.id"
  collection.updateRule = "@request.auth.id = user.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qr4q1oi0t0rco41")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
