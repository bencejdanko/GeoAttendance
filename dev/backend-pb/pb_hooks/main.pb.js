routerAdd("GET", "/hello/:name", (c) => {
    let name = c.pathParam("name")
    return c.json(200, { "message": "Hello " + name })
})

routerAdd("GET", "/users", (c) => {

    const result = arrayOf(new DynamicModel({
        "id":    "",
        "email": "",
    }))


    $app.dao().db()
    .select("id", "email")
    .from("users")
    .all(result)

    return c.json(200, result)
    
})

/**
 * A user marks themselves attending
 */
routerAdd("POST", "/events/:event_id/attendees/:user_id", (c) => {

    let event_id = c.pathParam("event_id")
    let user_id = c.pathParam("user_id")

    const record = $app.dao().findRecordById("events", event_id)
    let attendees = record.get("registered_attendees")

    if (!(user_id in attendees)) {
        throw new BadRequestError("User must be in event")
    }

    let m_attendees = attendees + user_id

    record.set("registered_attendees", m_attendees)
    $app.dao().saveRecord(record)

})

/**
 * A host retrieves the attendence rate of a user
 */
routerAdd("GET", "/users/:user_id/", (c) => {
    let user_id = c.pathParam("user_id")
    
})

/**
 * Host retrieves the group members, total rate of attendance, and the rate of attendance of each member
 */
routerAdd("GET", "/groups/:group_id", (c) => {

    let group = $app.dao().findRecordById("groups", c.pathParam("group_id"))
   
    const event = new DynamicModel({
        "event_id":    "",
        "name": "",
        "event_id": [],
        "registered_attendees": [],
    })

    $app.dao().db()
    .newQuery(`SELECT event_id, name, event_id, registered_attendees FROM groups WHERE id = '${group.id}'`)
    .one(event)

    return c.json(200, {
        "event": event,
    })

}, $apis.activityLogger($app))