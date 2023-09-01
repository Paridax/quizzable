/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rxeip9x33v50jly")

  collection.listRule = "@request.auth.id = quizzable.author.id || (quizzable.draft = false && quizzable.visibility = \"public\")"
  collection.viewRule = "@request.auth.id = quizzable.author.id || (quizzable.draft = false && quizzable.visibility != \"private\")"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rxeip9x33v50jly")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
