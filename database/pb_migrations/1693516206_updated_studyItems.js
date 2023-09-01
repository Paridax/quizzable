/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rxeip9x33v50jly")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rxeip9x33v50jly")

  collection.listRule = "@request.auth.id = quizzable.author.id || (quizzable.draft = false && quizzable.visibility = \"public\")"
  collection.viewRule = "@request.auth.id = quizzable.author.id || (quizzable.draft = false && quizzable.visibility != \"private\")"
  collection.createRule = "@request.data.quizzable.author.id = @request.auth.id"
  collection.updateRule = "quizzable.author.id = @request.auth.id && @request.data.term_or_question != \"\" && @request.data.definition_a1 != \"\""
  collection.deleteRule = "quizzable.author.id = @request.auth.id"

  return dao.saveCollection(collection)
})
