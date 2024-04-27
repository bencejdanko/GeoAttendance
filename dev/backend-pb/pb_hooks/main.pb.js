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
        "checked_out_attendees": [],
    }))

    $app.dao().db()
        .newQuery(`SELECT registered_attendees, checked_in_attendees, checked_out_attendees FROM events WHERE group_id = '${group.id}'`)
        .all(events)

    /**
     * Get the times a member was attended to events they were registered to
     */

    let member_data = []
    for (let member_id of members) {
        let member = $app.dao().findRecordById("users", member_id)

        let total_registered = 0
        let total_check_in = 0
        let total_check_out = 0

        for (let event of events) {
            let registered_attendees = event.registered_attendees || []
            if (registered_attendees.includes(member_id)) {
                //let checkins = $app.dao().findRecordById()
                //console.log($app.dao().findRecordById('checkins', member.get('')))
                total_registered += 1
            }

            let checked_in_attendees = event.checked_in_attendees || []
            for (let attendee_id of checked_in_attendees) {
                if (attendee_id === member_id) {
                    total_check_in += 1
                }
            }

            let checked_out_attendees = event.checked_out_attendees || []
            for (let attendee_id of checked_out_attendees) {
                if (attendee_id === member_id) {
                    total_check_out += 1
                }
            }
        }

        member_data.push({
            "member_name": member.get("first_name") + " " + member.get("last_name"),
            "checked_in": total_check_in,
            "checked_out": total_check_out,
            "absent": total_registered - total_check_out,
        })
    }

    return c.json(200, {
        "members": member_data,
    })

}, $apis.activityLogger($app))

onModelBeforeCreate(e => {
    let start_time = e.model.get("start_time")
    let end_time = e.model.get("end_time")
    if (start_time > end_time) {
        throw new Error("Start time must be before end time")
    }
}, "events")

onModelAfterUpdate((e) => {
    let registered_attendees = e.model.get("registered_attendees")
    let old_registered_attendees = e.model.originalCopy().get("registered_attendees")
    let newly_added = registered_attendees.filter(x => !old_registered_attendees.includes(x))

    let newly_added_emails = []
    for (let user_id of newly_added) {
        let user = $app.dao().findRecordById("users", user_id)
        newly_added_emails.push(user.get("email"))
    }

    let event_name = e.model.get("name") || "_error_"

    for (let email of newly_added_emails) {
        console.log("Sending test email")
        const message = new MailerMessage({
            from: {
                address: $app.settings().meta.senderAddress,
                name: $app.settings().meta.senderName,
            },
            to: [{ address: email }],
            subject: "GeoAttendance - You've been added to an event.",
            html: `<p>You've been added to the ${event_name} event at GeoAttendance.</p>`
        })

        $app.newMailClient().send(message)
    }
}, "events")


/*
* https://developers.google.com/maps/documentation/geocoding/requests-geocoding
*/
routerAdd("POST", "/geocode", async (c) => {
    const address = $apis.requestInfo(c).data.address
    const GEOCODER_API_KEY = process.env.GEOCODER_API_KEY || "Error!"
    console.log("KEY: " + GEOCODER_API_KEY)
    try {
        let res = $http.send({
            method: "GET",
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GEOCODER_API_KEY}`,
        })

        if (!res.json) {
            return c.json(500, {
                "error": "Failed to fetch location"
            })
        }

        let data = res.json
        let location = data.results[0].geometry.location
        let lat = location.lat
        let lon = location.lng
        return c.json(200, {
            "lat": lat,
            "lng": lon,
        })
    } catch (e) {
        return c.json(500, {
            "error": "Failed to fetch location",
        })
    }
})