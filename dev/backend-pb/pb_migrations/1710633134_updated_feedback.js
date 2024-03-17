/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jwsdc0q847402tm")

  collection.name = "feedbacks"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jwsdc0q847402tm")

  collection.name = "feedback"

  return dao.saveCollection(collection)
})
