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

    updateGroup: async (id, data) => {
        try {
            const group = await pb.collection('groups').update(id, data)
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
        
        let events_pb = []
        try {
            events_pb = await pb.collection('events').getFullList({
                filter: `code='${data.code}'`
            })
        } catch (e) { }

        if (events_pb.length === 0) {
            return new Error("No event found with that code.");
        }

        let event = events_pb[0]
        console.log(event.id)

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
        
        let updated_event = null;
        console.log("event id: " + event.id)
        try {
            updated_event = await pb.collection('events').update(event.id, {
                checked_in_attendees: checked_in_attendees
            })

        } catch (e) { }

        if (updated_event === null) {
            return new Error("You are not authorized to check in.");
        }

        return updated_event.id;
        
    },

    getEvents: async (id) => {
        try {
            const events = await pb.collection('events').getFullList({
                filter: `host='${id}'`
            })
            return events;
        } catch (e) {
            return [];
        }
    },

    getGroups: async (id) => {
        try {
            const groups = await pb.collection('groups').getFullList({
                filter: `host='${id}'`
            })
            return groups;
        } catch (e) {
            return [];
        }
    },

    getGroupName: (id) => {
        try {
            const group = pb.collection('groups').getOne(id, { requestKey: null })
            group.then((group) => {
                console.log(group.name)
                return group.name;
            })
        } catch (e) {
            return "N/A";
        }
    },

    deleteEvent: async (id) => {
        let events;

        try {
            events = await pb.collection('events').delete(id)
        } catch (e) {
            return [];
        }

        if (events.length === 0) {
            return new Error("Unable to delete nonexistent event.");
        }

        return events;
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
    },

    getTotalCheckIn: async() => {
        let events = []
        try {
            events = await pb.collection("events").getFullList()
        } catch (e) {
            console.log(e)
        }
        
        
        let total = 0
        events.forEach(event => {
            total += event.checked_in_attendees.length
        })
        return total
    },

    getTotalAbsent: async() => {

        let events = []
        
        try {
            events = await pb.collection("events").getFullList()
        } catch (e) {
            console.log(e)
        }
        
        
        let total = 0
        events.forEach(event => {
            total += event.registered_attendees.length - event.checked_in_attendees.length
        })
        return total
    }

}