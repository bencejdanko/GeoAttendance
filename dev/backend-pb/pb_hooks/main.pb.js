// collection = new Collection({
//     name: "events",
//     type: "base",
//     listRule: null,
//     viewRule:   "@request.auth.id != ''",
//     createRule: "",
//     updateRule: "@request.auth.id != ''",
//     deleteRule: null,

//     schema: [
//         {
//             name: "event_name",
//             type: "text",
//             required: true,
//             options: {
//                 min: 3,
//                 max: 100
//             }
//         },

//         {
//             name: "users",
//             type: "relation",
//             required: false,
//             options: {
//                 maxSelection: 1,
//                 collectionId: "_pb_users_auth_",

//             }
            
//         }
//     ],

//     indexes: [
//         "CREATE UNIQUE INDEX idx_user ON example (user)"
//     ],

//     options: {}
// })

// $app.dao().saveCollection(collection)

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