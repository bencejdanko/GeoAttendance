import pb from './pocketbase.js'
import * as geolib from 'geolib';

export default { 
    
    login: async (data) => {
        try {
            const authData = await pb.collection('users').authWithPassword(data.email, data.password)
            return authData;
        } catch (e) {
            return new Error(e.message);
        }
    },

    logout : async () => {
        try {
            await pb.authStore.clear()
            return true;
        } catch (e) {
            return new Error(e.message);
        }
    },

    signup: async (data) => {

        if (data.subscription === true) {
            data.subscription = 1
        } else {
            data.subscription = 0
        }

        try {
            const authData = await pb.collection('users').create(data)
            return authData;
        } catch (e) {
            let sent_message = e.message;

            if (e.response.data !== undefined) {
                if (e.response.data.email !== undefined) {
                    sent_message += 'Email: ' + e.response.data.email.message;
                } else if (e.response.data.username !== undefined) {
                    sent_message += 'Username: ' + e.response.data.username.message;
                } else if (e.response.data.password !== undefined) {
                    sent_message += 'Password: ' + e.response.data.password.message;
                } else if (data.password !== data.passwordConfirm) {
                    sent_message += 'Confirm Password: ' + "Passwords do not match.";
                } else {
                    sent_message += "An unrecoverable error occurred.";
                }

            } else {
                sent_message += "An unrecoverable error occurred.";
            }

            return new Error(sent_message);
        }
    },

    saveEvent: async (data) => {
        try {
            const event = await pb.collection('events').create(data)
            return event;
        } catch (e) {
            return new Error(e.message);
        }
    },

    createGroup: async (data) => {
        try {
            const group = await pb.collection('groups').create(data)
            return group;
        } catch (e) {
            return new Error(e.message);
        }
    },

    updateEvent: async (id, data) => {
        try {
            const event = await pb.collection('events').update(id, data)
            return event;
        } catch (e) {
            return new Error(e.message);
        }
    },

    checkin: async (data) => {
        try {

            let event = await pb.collection('events').getFullList({
                filter: `code="${data.code}"`
            })
            event = event[0]

            if (event === undefined) {
                return new Error("No event found with that code.");
            }

            console.log("User lat: " + data.latitude)
            console.log("User lon: " + data.longitude)
            console.log("event lat: " + event.latitude)
            console.log("Event long: " + event.longitude)

            const isAccepted = geolib.isPointWithinRadius(
                { latitude: Number(data.latitude), longitude: Number(data.longitude) },
                { latitude: Number(event.latitude), longitude: Number(event.longitude) },
                Number(event.radius)
            );

            if (!isAccepted) {
                return new Error("Not within the radius of the event.");
            }

            const checked_in_attendees = event.checked_in_attendees

            if (pb.authStore.model.id in checked_in_attendees) {
                return new Error("Already checked in");
            }

            checked_in_attendees.push(pb.authStore.model.id)
            const updated_event = await pb.collection('events').update(event.id, {
                checked_in_attendees: checked_in_attendees
            })
            return updated_event.id;
        } catch (e) {
            return new Error("No event found with that code.");
        }
    },

    getEvents: async () => {
        try {
            const events = await pb.collection('events').getFullList()
            return events;
        } catch (e) {
            return [];
        }
    },

    getAttendanceRate: async () => {
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

}