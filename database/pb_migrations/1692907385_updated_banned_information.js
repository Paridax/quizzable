/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ek0y7w425dnpw2c")

  collection.name = "bannedInformation"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ek0y7w425dnpw2c")

  collection.name = "banned_information"

  return dao.saveCollection(collection)
})
