import React, {useEffect, useState} from "react"
import deleteIcon from "../../icons/delete.png";
import query from "../../lib/query";

const GroupHistoryDetail = (props) => {

    const [members, setMembers] = useState([])
    const [events, setEvents] = useState([])

    useEffect(() => {

        const getEvents = () => {
            let events = props.group.expand.event_id
            console.log("events: ")
            console.log(events)
            if (!events) {
                setEvents([])
            } else {
                setEvents(events)
            }

        }

        const getMembers = () => {
            let members = props.group.expand.registered_attendees
            console.log("members: " )
            console.log(members)
            if (!members) {
                setMembers([])
            } else {
                setMembers(members)
            }
        }

        getMembers()
        getEvents()

    }, [members, events])

    return (
        <div className="p-4 md:w-1/3 sm:w-full">
            <div className="flex rounded-lg bg-gray-800 bg-opacity-60 p-8 flex-col">
                <div className="flex items-center mb-3">
                    <h2 className="text-white text-lg title-font font-medium w-full">{props.group.name}</h2>
                </div>
                <div className="flex flex-grow mt-5">
                    <div className="md:w-1/2 sm:w-1/2 flex flex-col items-start">
                        <p className="text-white text-lg">Upcoming Events</p>
                        {
                            events.map(event => (
                                // Check if event.start_time hasn't passed yet
                                new Date(event.start_time) > new Date() && (
                                    <div className=" items-center">
                                        <tr>
                                            <td className="px-4 py-3 text-xl">{event.name}</td>
                                            <td className="px-4 py-3 text-xl">{event.checked_in_attendees.length}/{event.registered_attendees.length}</td>
                                        </tr>
                                    </div>
                                )
                            ))
                        }
                    </div>
                </div>

                <div className="flex flex-grow mt-5">
                    <div className="md:w-1/2 sm:w-1/2 flex flex-col items-start">
                        <p className="text-white text-lg">Past Events</p>
                        {
                            events.map(event => (
                                // Check if event.start_time hasn't passed yet
                                new Date(event.start_time) < new Date() && (
                                    <div className=" items-center">
                                        <tr>
                                            <td className="px-4 py-3 text-xl">{event.name}</td>
                                            <td className="px-4 py-3 text-xl">{event.checked_in_attendees.length}/{event.registered_attendees.length}</td>
                                        </tr>
                                    </div>
                                )
                            ))
                        }
                    </div>
                </div>

                <div className="flex flex-grow mt-5">
                    <div className="md:w-1/2 sm:w-1/2 flex flex-col items-start">
                        <p className="text-white text-lg">Group Members</p>
                        {
                            members.map(attendee => (
                                <div className="flex items-center">
                                    <tr className=''>
                                        <td className="px-4 py-3"><p className="leading-relaxed text-lg w-full">{attendee.first_name} {attendee.last_name}</p></td>

                                        <td className="px-4 py-3"><button onClick={() => query.removeGroupMember(props.group.id, attendee.id)}>
                                            <img className="object-cover object-center rounded" src={deleteIcon} alt="deleteIcon" width={30} />
                                        </button></td>
                                    </tr>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default GroupHistoryDetail;