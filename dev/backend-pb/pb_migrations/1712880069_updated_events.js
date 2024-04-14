/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wzaaoviym6saqcb")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_rwbnBBb` ON `events` (\n  `checkin_code`,\n  `checkout_code`\n)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5cwhepyo",
    "name": "checkout_code",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nldtz50p",
    "name": "checkin_code",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wzaaoviym6saqcb")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_rwbnBBb` ON `events` (`code`)"
  ]

  // remove
  collection.schema.removeField("5cwhepyo")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nldtz50p",
    "name": "code",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
