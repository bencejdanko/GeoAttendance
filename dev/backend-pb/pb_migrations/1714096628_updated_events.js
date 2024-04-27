/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wzaaoviym6saqcb")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wbzvglts",
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
  const collection = dao.findCollectionByNameOrId("wzaaoviym6saqcb")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wbzvglts",
    "name": "capacity",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 1000,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
})
