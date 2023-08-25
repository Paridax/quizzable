/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x28fn9icpmfg9gs")

  collection.listRule = "@request.auth.id = author.id"
  collection.viewRule = "@request.auth.id = author.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x28fn9icpmfg9gs")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
