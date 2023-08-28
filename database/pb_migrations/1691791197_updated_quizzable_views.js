/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5lcoeljthnupbd0")

  collection.createRule = "@request.auth.id = user.id && quizzable.visibility != \"private\" && quizzable.draft = false"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5lcoeljthnupbd0")

  collection.createRule = null

  return dao.saveCollection(collection)
})
