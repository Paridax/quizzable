/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f2vm38c2983h921")

  collection.name = "classesCategories"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f2vm38c2983h921")

  collection.name = "classes_categories"

  return dao.saveCollection(collection)
})
