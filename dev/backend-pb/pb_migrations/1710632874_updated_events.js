/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wzaaoviym6saqcb")

  collection.createRule = "@request.auth.subscription = 1"
  collection.updateRule = "@request.auth.subscription = 1 &&\n@request.auth.id = host.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wzaaoviym6saqcb")

  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
