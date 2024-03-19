import PocketBase from 'pocketbase';

const pb = new PocketBase("http://127.0.0.1:8090");

const register = async () => {
    let data = {
        username: "test",
        email: "bencejdanko@gmail.com",
        password: "123456789",
        passwordConfirm: "123456789",
        first_name: "test",
        last_name: "test",
        subscription: 1
    }

    try {
        let authData = await pb.collection('users').create(data)
        console.log(authData)
    } catch (e) {
        console.log("User already registered.")
    }
}

const login = async () => {
    //logout of any current authenticated user
    pb.authStore.clear();

    let data = {
        email: "bencejdanko@gmail.com",
        password: "123456789"
    }

    try {
        let request = await pb.collection('users').authWithPassword(data.email, data.password)

        console.log("Authenticated: " + pb.authStore.isValid);
        // console.log(pb.authStore.token);
        // console.log(pb.authStore.model.id);

    } catch (e) {
        console.log(e)
    }
}

const registerEvent = async () => {

    if (pb.authStore.isValid) {

        let currentDate = new Date();

        let data = {
            name: "test",
            host: pb.authStore.model.id, //Current user ID
            capacity: 50,
            code: "testing",
            longitude: 50,
            latitude: 50,
            radius: 50,
            registed_attendees: [],
            checked_in_attendees: [],
            start_time: currentDate.toISOString(),
            end_time: currentDate.toISOString(),
        }

        try {
            const response = await pb.collection('events').create(data)
            console.log("Event created: " + response.id)
            return response.id
        } catch (e) {
            console.log(e)
        }
    } else {
        console.log("User not authenticated. Cannot create event.")
    }
}

const registerUserToEventAttendees = async (event_id, user_id) => {
    try {
        const event = await pb.collection('events').getOne(event_id)
        const registed_attendees = event.registered_attendees
        const updated_attendees = registed_attendees.push(user_id)

        const response = await pb.collection('events').update(event_id, {
            registered_attendees: updated_attendees
        })

        console.log("User registered to event: " + response.id)

    } catch (e) {
        console.log(e)
    }
}

const registerGroup = async (event_id) => {

    let group_data = {
        host: pb.authStore.model.id, //Current user ID
        name: "test_group",
        capacity: 50,
        code: "testing",
        event_id: event_id,
    }

    try {
        group = await pb.collection('groups').create(group_data)
        console.log(group)
    } catch (e) {
        console.log(e)
    }

}

const viewEvents = async () => {
    try {
        let events = await pb.collection('events').getFullList({
            host: pb.authStore.model.id
        })
        console.log(events)
        return events
    } catch (e) {
        console.log(e)
    }
}
// total events that user has attended
// individual user attendance rate in a group 

//const register

//attendance rate
const get_attendance_rate = async () => {
    let total_events = 0;
    let total_attended = 0;

    try {
        let events = await pb.collection('events').getFullList({
            host: pb.authStore.model.id
        })

        total_events = events.length;

        for (let event of events) {
            let checked_in_attendees = await pb.collection('checked_in_attendees').getFullList()
            for (let attendee_id of checked_in_attendees) {
                if (attendee_id === pb.authStore.model.id) {
                    total_attended += 1;
                }
            }
        }

        console.log(total_attended / total_events)
    } catch (e) {
        console.log(e)
    }
}

const run = () => {
    register().then(() => {
        login().then(() => {
            registerEvent().then((event_id) => {
                registerUserToEventAttendees(event_id, pb.authStore.model.id).then(() => {
                })
            })
        })
    })
}

run();
