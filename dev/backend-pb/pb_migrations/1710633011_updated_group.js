/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("impqs5szmvwh89n")

  collection.updateRule = "@request.auth.subscription = 1 &&\n@request.auth.id = host.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("impqs5szmvwh89n")

  collection.updateRule = null

  return dao.saveCollection(collection)
})
