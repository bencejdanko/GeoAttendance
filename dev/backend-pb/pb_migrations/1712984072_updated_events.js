/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wzaaoviym6saqcb")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_rwbnBBb` ON `events` (\n  `checkin_code`,\n  `checkout_code`\n)",
    "CREATE UNIQUE INDEX `idx_D5YsKkY` ON `events` (`checkout_code`)",
    "CREATE UNIQUE INDEX `idx_ojhTFs9` ON `events` (`checkin_code`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wzaaoviym6saqcb")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_rwbnBBb` ON `events` (\n  `checkin_code`,\n  `checkout_code`\n)"
  ]

  return dao.saveCollection(collection)
})
