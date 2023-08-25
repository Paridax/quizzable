/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5lcoeljthnupbd0")

  collection.name = "quizzableViews"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5lcoeljthnupbd0")

  collection.name = "quizzable_views"

  return dao.saveCollection(collection)
})
