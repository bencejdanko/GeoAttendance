routerAdd("GET", "/hello/:name", (c) => {
    let name = c.pathParam("name")
    return c.json(200, { "message": "Hello " + name })
})

routerAdd("GET", "/users", (c) => {

    const result = arrayOf(new DynamicModel({
        "id": "",
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

    let record = c.get("authRecord")
    if (!record) {
        return c.json(403, { "message": "Unauthorized" })
    }

    let group = $app.dao().findRecordById("groups", c.pathParam("group_id"))
    if (!group) {
        return c.json(404, { "message": "Group not found" })
    }

    if (group.get("host") !== record.get("id")) {
        return c.json(403, { "message": "Unauthorized" })
    }

    let members = group.get("registered_attendees") || []

    let events = arrayOf(new DynamicModel({
        "registered_attendees": [],
        "checked_in_attendees": [],
    }))

    $app.dao().db()
        .newQuery(`SELECT registered_attendees, checked_in_attendees FROM events WHERE group_id = '${group.id}'`)
        .all(events)

    /**
     * Get the times a member was attended to events they were registered to
     */

    let member_data = []
    for (let member_id of members) {
        let member = $app.dao().findRecordById("users", member_id)

        let total_registered = 0
        let total_attended = 0

        for (let event of events) {
            let registered_attendees = event.registered_attendees || []
            if (registered_attendees.includes(member_id)) {
                total_registered += 1
            }
            total_registered += 1

            let checked_in_attendees = event.checked_in_attendees || []
            for (let attendee_id of checked_in_attendees) {
                if (attendee_id === member_id) {
                    total_attended += 1
                }
            }
        }

        member_data.push({
            "member_name": member.get("first_name") + " " + member.get("last_name"),
            "checked_in": total_attended,
            "absent": total_registered - total_attended,
        })
    }

    return c.json(200, {
        "members": member_data,
    })

}, $apis.activityLogger($app))

// routerAdd("POST", "/notify/:group_id", (c) => {
//     let record = c.get("authRecord")
//     if (!record) {
//         return c.json(403, { "message": "Unauthorized" })
//     }

//     let user = $app.dao().findRecordById("users", record.get("id"))
//     return c.json(200, { "message": "Notification sent" })
// })

// onModelAfterUpdate((e) => {
//     let registered_attendees = e.model.get("registered_attendees")
//     let old_registered_attendees = e.model.originalCopy().get("registered_attendees")
//     let newly_added = registered_attendees.filter(x => !old_registered_attendees.includes(x))

//     let newly_added_emails = []
//     for (let user_id of newly_added) {
//         let user = $app.dao().findRecordById("users", user_id)
//         newly_added_emails.push(user.get("email"))
//     }

//     for (let email of newly_added_emails) {
//         const message = new MailerMessage({
//             from: {
//                 address: $app.settings().meta.senderAddress,
//                 name: $app.settings().meta.senderName,
//             },
//             to: [{address: email}],
//             subject: "You've been added to an event",
//             html: "<p>You've been added to an event</p>",
//         })

//         $app.newMailClient().send(message)
//     }
// }, "events")