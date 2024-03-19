import PocketBase from 'pocketbase';

const pb = new PocketBase("http://127.0.0.1:8090");

const register = () => {
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
        let request = pb.collection('users').create(data)
        authData = request.then((authData) => {
            console.log(authData)
        })
    } catch (e) {
        console.log(e)
    }
}

const login = () => {
    //logout of any current authenticated user
    pb.authStore.clear();

    let data = {
        email: "bencejdanko@gmail.com",
        password: "123456789"
    }

    try {
        let request = pb.collection('users').authWithPassword(data.email, data.password)
        request.then((authData) => {
            console.log(pb.authStore.isValid);
            console.log(pb.authStore.token);
            console.log(pb.authStore.model.id);
        })
    } catch (e) {
        console.log(e)
    }
}

const registerEvent = async () => {
    let currentDate = new Date();

    let data = {
        name: "test",
        host: pb.authStore.model.id, //Current user ID
        capacity: 50,
        code: "testing",
        longitude: 50,
        latitude: 50,
        radius: 50,
        start_time: currentDate.toISOString(),
        end_time: currentDate.toISOString(),
    }

    console.log(data.start_time)

    try {
        const response = await pb.collection('events').create(data)
        return response
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
    register()
    login()
}

run();
