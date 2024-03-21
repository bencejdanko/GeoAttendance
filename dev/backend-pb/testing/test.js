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
        const registered_attendees = event.registered_attendees
        registered_attendees.push(user_id)

        const response = await pb.collection('events').update(event_id, {
            registered_attendees: registered_attendees
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
        const group = await pb.collection('groups').create(group_data)
        console.log("Group created: " + group.id)
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
    } catch (e) {
        console.log(e)
    }
}

const markAttendance = async (event_id, user_id) => {
    try {
        const event = await pb.collection('events').getOne(event_id)
        const checked_in_attendees = event.checked_in_attendees
        checked_in_attendees.push(user_id)

        const response = await pb.collection('events').update(event_id, {
            checked_in_attendees: checked_in_attendees
        })

        console.log("User checked in to event: " + response.id)

    } catch (e) {
        console.log(e)
    }
}

//attendance rate
const getAttendanceRate = async () => {
    let total_events = 0;
    let total_attended = 0;

    try {
        let events = await pb.collection('events').getFullList({
            host: pb.authStore.model.id
        })

        total_events = events.length;

        for (let event of events) {
            let checked_in_attendees = event.checked_in_attendees
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

const run = async () => {
    try {
        await register();
        await login();
        const event_id = await registerEvent();
        await registerUserToEventAttendees(event_id, pb.authStore.model.id);
        await registerGroup(event_id);
        await viewEvents();
        await markAttendance(event_id, pb.authStore.model.id);
        await getAttendanceRate();
    } catch (error) {
        console.error(error);
    }
}

run();
