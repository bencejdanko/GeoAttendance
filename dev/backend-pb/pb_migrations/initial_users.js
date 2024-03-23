migrate((db) => {
    const dao = new Dao(db)
    const collection = dao.findCollectionByNameOrId("users")
    const record = new Record(collection)
    record.setUsername("bdanko")
    record.setPassword("123456789")
    record.set("name", "Bence Danko")
    record.set("email", "bencejdanko@gmail.com")
    record.set("subscription", 1)
    dao.saveRecord(record)

})