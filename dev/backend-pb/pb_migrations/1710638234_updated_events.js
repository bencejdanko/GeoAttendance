/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wzaaoviym6saqcb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3pjosrpb",
    "name": "group_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "impqs5szmvwh89n",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wzaaoviym6saqcb")

  // remove
  collection.schema.removeField("3pjosrpb")

  return dao.saveCollection(collection)
})
