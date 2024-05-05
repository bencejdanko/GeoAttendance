import pb from './pocketbase.js'
import * as geolib from 'geolib';

const url = process.env.REACT_APP_PB_URL

export default {

    login: async (data) => {
        try {
            const authData = await pb.collection('users').authWithPassword(data.email, data.password)
            return authData;
        } catch (e) {
            return new Error(e.message);
        }
    },

    logout: async () => {
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

    saveCheckinTime: async (event_id, user_id, checkin_time) => {
        try {
            const checkin = await pb.collection('checkins').create({
                event_id: event_id,
                user_id: user_id,
                checkin_time: checkin_time
            })
            return checkin;
        } catch (e) {
            return new Error(e.message);
        }
    },

    saveCheckoutTime: async (event_id, user_id, checkout_time) => {
        try {
            const checkin = await pb.collection('checkins').getFullList({
                filter: `event_id='${event_id}' && user_id='${user_id}'`
            })

            if (checkin.length > 0) {
                const response = await pb.collection('checkins').update(checkin[0].id, {
                    checkout_time: checkout_time
                })

                if (response) {
                    return true;
                }
            }
            return false;
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

    uploadDefaultAvatar: async () => {
        try {
            const response = await fetch('Stefan.jpg');
            const blob = await response.blob();
            await pb.collection('users').update(pb.authStore.model.id, { avatar: blob });
        } catch (e) {
            return new Error(e.message);
        }
    },

    uploadAvatar: async (blob) => {
        try {
            await pb.collection('users').update(pb.authStore.model.id, { avatar: blob })
        } catch (e) {
            return new Error(e.message);
        }
    },

    getAvatarURL: async () => {
        try {
            const data = await pb.collection('users').getOne(pb.authStore.model.id);
            let file_name = data.avatar
            let file_url = `${url}/files/users/${pb.authStore.model.id}/avatar/${file_name}`
            return file_url;
        } catch (e) {
            return new Error(e.message);
        }
    },

    checkin: async (data) => {

        let events_pb = []
        try {
            events_pb = await pb.collection('events').getFullList({
                filter: `checkin_code='${data.code}'`
            })
        } catch (e) { }

        if (events_pb.length === 0) {
            return new Error("No event found with that code.");
        }

        let event = events_pb[0]
        const curDate = new Date();

        if (new Date(event.end_time) < curDate || new Date(event.start_time) > curDate) {
            return new Error("Please checkin during the event time window.");
        }

        const isAccepted = geolib.isPointWithinRadius(
            { latitude: Number(data.latitude), longitude: Number(data.longitude) },
            { latitude: Number(event.latitude), longitude: Number(event.longitude) },
            Number(event.radius)
        );

        if (!isAccepted) {
            return new Error("Not within the radius of the event.");
        }

        const checked_in_attendees = event.checked_in_attendees

        if (checked_in_attendees.includes(pb.authStore.model.id)) {
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

    checkout: async ({ latitude, longitude, code }) => {

        let events_pb = []
        try {
            events_pb = await pb.collection('events').getFullList({
                filter: `checkout_code='${code}'`
            })
        } catch (e) { }

        if (events_pb.length === 0) {
            return new Error("No event found with that code.");
        }

        let event = events_pb[0]
        const curDate = new Date();

        if (new Date(event.end_time) < curDate || new Date(event.start_time) > curDate) {
            return new Error("Please checkout during the event time window.");
        }

        const isAccepted = geolib.isPointWithinRadius(
            { latitude: Number(latitude), longitude: Number(longitude) },
            { latitude: Number(event.latitude), longitude: Number(event.longitude) },
            Number(event.radius)
        );

        if (!isAccepted) {
            return new Error("Not within the radius of the event.");
        }

        const checked_out_attendees = event.checked_out_attendees

        if (checked_out_attendees.includes(pb.authStore.model.id)) {
            return new Error("Already checked out");
        }


        checked_out_attendees.push(pb.authStore.model.id)

        let updated_event = null;
        console.log("event id: " + event.id)
        try {
            updated_event = await pb.collection('events').update(event.id, {
                checked_out_attendees: checked_out_attendees
            })

        } catch (e) { }

        if (updated_event === null) {
            return new Error("You are not authorized to check out.");
        }

        return updated_event.id;

    },

    getEvents: async (id) => {
        try {
            const events = await pb.collection('events').getFullList({
                filter: `host='${id}'`,
                expand: 'registered_attendees,group_id.registered_attendees'
            })
            return events;
        } catch (e) {
            return [];
        }
    },

    getEvent: async (eventId) => {
        try {
            const event = await pb.collection('events').getFullList({
                filter: `id='${eventId}'`,
                expand: 'registered_attendees,group_id.registered_attendees'
            })
            return event;
        } catch (e) {
            return new Error("An error occurred.");
        }
    },
    getGroups: async (id) => {
        try {
            const groups = await pb.collection('groups').getFullList({
                filter: `host='${id}'`,
                expand: 'registered_attendees, event_id'
            })
            return groups;
        } catch (e) {
            return [];
        }
    },

    getGroup: async (id) => {
        try {
            const group = await pb.collection('groups').getOne(id, { requestKey: null })
            return group;
        } catch (e) {
            return new Error("An error occurred.");
        }
    },

    getGroupName: async (id) => {
        try {
            const group = await pb.collection('groups').getOne(id, { requestKey: null }) //handle autocancellation
            return group.name;
        } catch (e) {
            return "N/A";
        }
    },

    removeEventFromGroup: async (groupId, eventId) => {
        try {
            let group = await pb.collection('groups').getOne(groupId)
            let event_ids = group.event_id
            let new_event_ids = event_ids.filter(event => event !== eventId)
            console.log(new_event_ids)
            let updated_group = await pb.collection('groups').update(groupId, {
                event_id: new_event_ids
            })
            
            let updated_event = await pb.collection('events').update(eventId, {
                group_id: null
            })
            
            return updated_group;
        } catch (e) {
            return new Error(e.message);
        }
    },

    deleteEvent: function(id) {
        return pb.collection('events').delete(id)
            .then(events => {
                if (events.length === 0) {
                    throw new Error("Unable to delete nonexistent event.");
                }
                return events;
            })
            .catch(e => {
                return [];
            });
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

    getAttendeeAttendance: async (attendeeId) => {
        try {
            let events = await pb.collection('events').getFullList({
                filter: `registered_attendees~'${attendeeId}'`,
            })

            let total_events = events;
            let total_check_ins = []
            let total_check_outs = []
            let total_absent = []
            for (let event of events) {
                let checked_in_attendees = event.checked_in_attendees
                for (let attendee_id of checked_in_attendees) {
                    if (attendee_id === attendeeId) {
                        total_check_ins.push(event);
                    }
                }
            }

            for (let event of events) {
                let checked_out_attendees = event.checked_out_attendees
                for (let attendee_id of checked_out_attendees) {
                    if (attendee_id === attendeeId) {
                        total_check_outs.push(event);
                    }
                }
            }

            total_absent = total_events.filter(event => !(total_check_ins.includes(event) && total_check_outs.includes(event)));
            return {
                total_check_ins: total_check_ins,
                total_events: total_events,
                total_absent: total_absent,
                total_check_outs: total_check_outs
            }
        } catch (e) {
            console.log(e)
        }
    },

    getTotalCheckIn: async () => {
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

    getTotalAbsent: async () => {

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
    },

    removeGroupMember: async (groupId, memberId) => {
        try {
            let group = await pb.collection('groups').getOne(groupId)
            let registered_attendees = group.registered_attendees
            let new_registered_attendees = registered_attendees.filter(attendee => attendee !== memberId)
            let updated_group = await pb.collection('groups').update(groupId, {
                registered_attendees: new_registered_attendees
            })
            return updated_group;
        } catch (e) {
            return new Error(e.message);
        }
    },
    removeAEventMemberInGroupANdAllGroupEvents: async (groupId, memberId) => {

        try {
            let group = await pb.collection('groups').getOne(groupId)
            let registered_attendees = group.registered_attendees
            let new_registered_attendees = registered_attendees.filter(attendee => attendee !== memberId)
            let updated_group = await pb.collection('groups').update(groupId, {
                ...group,
                registered_attendees: new_registered_attendees
            })
            updated_group.event_id.forEach(async e => {
                let event = await pb.collection('events').getOne(e)
                let event_registered_attendees = event.registered_attendees
                let new_event_registered_attendees = event_registered_attendees.filter(attendee => attendee !== memberId)
                let event_checked_in_attendees = event.checked_in_attendees
                let new_event_checked_in_attendees = event_checked_in_attendees.filter(attendee => attendee !== memberId)
                let event_checked_out_attendees = event.checked_out_attendees
                let new_event_checked_out_attendees = event_checked_out_attendees.filter(attendee => attendee !== memberId)
                await pb.collection('events').update(e, {
                    ...event,
                    registered_attendees: new_event_registered_attendees,
                    checked_in_attendees: new_event_checked_in_attendees,
                    checked_out_attendees: new_event_checked_out_attendees
                })
            })
            return updated_group;
        } catch (e) {
            return new Error(e.message);
        }
    },

    removeEventMember: async (eventId, memberId) => {
        try {
            let event = await pb.collection('events').getOne(eventId)
            let registered_attendees = event.registered_attendees
            let new_registered_attendees = registered_attendees.filter(attendee => attendee !== memberId)
            let checked_in_attendees = event.checked_in_attendees
            let new_checked_in_attendees = checked_in_attendees.filter(attendee => attendee !== memberId)
            let checked_out_attendees = event.registered_attendees
            let new_checked_put_attendees = checked_out_attendees.filter(attendee => attendee !== memberId)
            let updated_event = await pb.collection('events').update(eventId, {
                ...event,
                registered_attendees: new_registered_attendees,
                checked_in_attendees: new_checked_in_attendees,
                checked_out_attendees: new_checked_put_attendees
            })
            return updated_event;
        } catch (e) {
            return new Error(e.message);
        }
    },

    updateGroupEventsWithNewMembers: async (groupId, newMembersIds) => {
        try {
            let group = await pb.collection('groups').getOne(groupId)
            let event_ids = group.event_id
            let updated_events = []
            for (let event_id of event_ids) {
                let event = await pb.collection('events').getOne(event_id)
                let registered_attendees = event.registered_attendees
                let new_registered_attendees = Array.from(new Set(registered_attendees.concat(newMembersIds)))
                let updated_event = await pb.collection('events').update(event_id, {
                    registered_attendees: new_registered_attendees
                })
                console.log(`Updated event ${event_id} with new members: ${JSON.stringify(new_registered_attendees)}`)
                updated_events.push(updated_event)
            }
            return updated_events;
        } catch (e) {
            return new Error(e.message);
        }
    },

    getGroupMemberDetails: async (groupId) => {
        let data = await fetch(url + '/groups/' + groupId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': pb.authStore.token
            }
        })
        return data.json()
    },

    // sendNotifyEmail: async (data) => {
    //     console.log(url + '/notify')
    //     let response = await fetch(url + '/notify', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': pb.authStore.token
    //         },
    //         body: {
    //             users: data.users,
    //         }
    //     })
    //     return response.json()
    // },

    deleteGroup: async (id) => {
        let groups;

        try {
            groups = await pb.collection('groups').delete(id)
        } catch (e) {
            return [];
        }

        if (groups.length === 0) {
            return new Error("Unable to delete nonexistent group.");
        }

        return groups;
    },

    submitFeedback: async ({ name, email, message }) => {
        try {
            const feedback = await pb.collection('feedbacks').create({
                name: name,
                email: email,
                message: message
            })
            return feedback;
        } catch (e) {
            return new Error(e.message);
        }
    }


}