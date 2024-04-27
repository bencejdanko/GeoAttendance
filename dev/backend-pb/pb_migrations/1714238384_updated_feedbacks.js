/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jwsdc0q847402tm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wlebcwnk",
    "name": "email",
    "type": "email",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": [],
      "onlyDomains": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jwsdc0q847402tm")

  // remove
  collection.schema.removeField("wlebcwnk")

  return dao.saveCollection(collection)
})
