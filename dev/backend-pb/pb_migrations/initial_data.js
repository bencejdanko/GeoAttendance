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
    GROUP DATE
    */

    collection = dao.findCollectionByNameOrId("groups")
    let group1 = new Record(collection)
    group1.set("id", "g1")
    group1.set("host", 1)
    group1.set("name", "Bence's Group")
    group1.set("capacity", "50")

    collection = dao.findCollectionByNameOrId("groups")
    let group2 = new Record(collection)
    group2.set("id", "g2")
    group2.set("host", 3)
    group2.set("name", "Jessica's Group")
    group2.set("capacity", "50")
    /*
    EVENT DATA
    */

    collection = dao.findCollectionByNameOrId("events")
    record = new Record(collection)

    let start = new Date('2024-01-01T01:00:00');
    let end = new Date('2055-01-01T01:00:00');

    let event1 = new Record(collection)
    event1.set("id", "event1")
    event1.set("name", "event1")
    event1.set("host", 3)
    event1.set("start_time", start.toISOString())
    event1.set("end_time", end.toISOString())
    event1.set("latitude", "0")
    event1.set("longitude", "0")
    event1.set("radius", 50)
    event1.set("capacity", 50)
    event1.set("checkin_code", "testing")
    event1.set("checkout_code", "testing_checkout")
    event1.set("registered_attendees", [4])

    let event2 = new Record(collection)
    event2.set("id", "event2")
    event2.set("name", "event2")
    event2.set("host", 3)
    event2.set("start_time", start.toISOString())
    event2.set("end_time", end.toISOString())
    event2.set("latitude", "-121.9062887")
    event2.set("longitude", "37.3607574")
    event2.set("radius", 50)
    event2.set("capacity", 50)
    event2.set("checkin_code", "testing2")
    event2.set("checkout_code", "testing2_checkout")
    event2.set("registered_attendees", [4])

    let event3 = new Record(collection)
    event3.set("id", "event3")
    event3.set("name", "event3")
    event3.set("host", 1)
    event3.set("start_time", start.toISOString())
    event3.set("end_time", end.toISOString())
    event3.set("latitude", "-121.8985575")
    event3.set("longitude", "37.2344502")
    event3.set("radius", 50)
    event3.set("capacity", 50)
    event3.set("checkin_code", "testing3")
    event3.set("checkout_code", "testing3_checkout")
    event3.set("registered_attendees", [2])

    event1.set("group_id", ["g2"])
    event2.set("group_id", ["g2"])
    event3.set("group_id", ["g1"])
    dao.saveRecord(event1)
    dao.saveRecord(event2)
    dao.saveRecord(event3)


    group2.set("event_id", ["event1", "event2"])
    group1.set("event_id", ["event3"])

    group1.set("registered_attendees", [2])
    group2.set("registered_attendees", [4])

    dao.saveRecord(group1)
    dao.saveRecord(group2)
})