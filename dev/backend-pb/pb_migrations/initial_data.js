migrate((db) => {
    const dao = new Dao(db)
    let collection = dao.findCollectionByNameOrId("users")

    /*
    USER DATA
    */

    let record = new Record(collection)
    record.set("id", 1)
    record.setUsername("bdanko")
    record.setPassword("123456789")
    record.set("first_name", "Bence")
    record.set("last_name", "Danko")
    record.set("email", "bencejdanko@gmail.com")
    record.set("subscription", 1)
    dao.saveRecord(record)

    record = new Record(collection)
    record.set("id", 2)
    record.setUsername("bdanko2")
    record.setPassword("123456789")
    record.set("first_name", "Bence")
    record.set("last_name", "Danko")
    record.set("email", "bencejdanko2@gmail.com")
    record.set("subscription", 0)
    dao.saveRecord(record)

    record = new Record(collection)
    record.set("id", 3)
    record.setUsername("dttrinh")
    record.setPassword("123456789")
    record.set("first_name", "Da Thao")
    record.set("last_name", "Trinh")
    record.set("email", "dathaotrinh@gmail.com")
    record.set("subscription", 1)
    dao.saveRecord(record)

    record = new Record(collection)
    record.set("id", 4)
    record.setUsername("dttrinh2")
    record.setPassword("123456789")
    record.set("first_name", "Da Thao")
    record.set("last_name", "Trinh")
    record.set("email", "dathaotrinh2@gmail.com")
    record.set("subscription", 0)
    dao.saveRecord(record)

    /*
    EVENT DATA
    */

    collection = dao.findCollectionByNameOrId("events")
    record = new Record(collection)

    let start = new Date('2024-01-01T01:00:00');
    let end = new Date('2025-01-01T01:00:00');

    record = new Record(collection)
    record.set("name", "event1")
    record.set("host", 3)
    record.set("start_time", start.toISOString())
    record.set("end_time", end.toISOString())
    record.set("latitude", "-121.8821451")
    record.set("longitude", "37.3323527")
    record.set("radius", 50)
    record.set("capacity", 50)
    record.set("code", "testing")
    record.set("registered_attendees", [2, 4])
    dao.saveRecord(record)

    record = new Record(collection)
    record.set("name", "event2")
    record.set("host", 3)
    record.set("start_time", start.toISOString())
    record.set("end_time", end.toISOString())
    record.set("latitude", "-121.9062887")
    record.set("longitude", "37.3607574")
    record.set("radius", 50)
    record.set("capacity", 50)
    record.set("code", "testing2")
    record.set("registered_attendees", [2, 4])
    dao.saveRecord(record)

    record = new Record(collection)
    record.set("name", "event3")
    record.set("host", 1)
    record.set("start_time", start.toISOString())
    record.set("end_time", end.toISOString())
    record.set("latitude", "-121.8985575")
    record.set("longitude", "37.2344502")
    record.set("radius", 50)
    record.set("capacity", 50)
    record.set("code", "testing3")
    record.set("registered_attendees", [2, 4])
    dao.saveRecord(record)


})