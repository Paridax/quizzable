/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rxeip9x33v50jly")

  collection.updateRule = "@request.auth.id = quizzable.author"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rxeip9x33v50jly")

  collection.updateRule = null

  return dao.saveCollection(collection)
})
