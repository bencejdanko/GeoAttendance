/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wzaaoviym6saqcb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xudgnldt",
    "name": "checked_out_attendees",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wzaaoviym6saqcb")

  // remove
  collection.schema.removeField("xudgnldt")

  return dao.saveCollection(collection)
})
