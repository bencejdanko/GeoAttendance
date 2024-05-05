/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("impqs5szmvwh89n")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d8ffbxpu",
    "name": "event_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "wzaaoviym6saqcb",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("impqs5szmvwh89n")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d8ffbxpu",
    "name": "event_id",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "wzaaoviym6saqcb",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
