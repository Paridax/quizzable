/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rxeip9x33v50jly")

  collection.listRule = "quizzable.author.id = @request.auth.id"
  collection.viewRule = "quizzable.author.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rxeip9x33v50jly")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
