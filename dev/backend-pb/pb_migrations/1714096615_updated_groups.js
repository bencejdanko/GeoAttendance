/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("impqs5szmvwh89n")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3upnxebv",
    "name": "capacity",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("impqs5szmvwh89n")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3upnxebv",
    "name": "capacity",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
})
