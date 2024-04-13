import React, { useEffect, useState } from "react"
import deleteIcon from "../../icons/delete.png";
import query from "../../lib/query";

const GroupHistoryDetail = (props) => {

    const [members, setMembers] = useState([])
    const [events, setEvents] = useState([])

    useEffect(() => {

        const getEvents = () => {
            let events = props.group.expand.event_id
            if (!events) {
                setEvents([])
            } else {
                setEvents(events)
            }

        }

        const getMembers = async () => {
            let members = props.group.expand.registered_attendees
            if (!members) {
                setMembers([])
            } else {

                const data = await Promise.all(members.map(async member => {
                    const numberCheckedIn = await query.getNumberMemberCheckedIn(props.group.id, member.id)
                    return { ...member, numberCheckedIn }
                }))
                setMembers(data)
            }
        }

        let data = query.getGroupDetails(props.group.id)
        data.then(data => {

            console.log("data: ")
            console.log(data)
        })
        getEvents()

    }, [members, events])

    return (
        <div className="p-4 md:w-1/3 sm:w-full flex flex-1">
            <div className="flex rounded-lg bg-gray-800 bg-opacity-60 p-5 flex-col items-center ">
                <div className="flex items-center mb-3">
                    <h2 className="text-white text-lg title-font font-medium w-full p-2">{props.group.name}</h2>
                    <button onClick={() => query.removeGroup(props.group.id)}><img className="object-cover object-center rounded" src={deleteIcon} alt="deleteIcon" width={30} /></button>
                </div>

                <div className="flex flex-grow p-3">
                    <p className="text-white text-lg">Events</p>
                </div>

                <table className="table-auto w-full text-left whitespace-no-wrap">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Name</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Status</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Checked-in</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Registered</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            events.map(event => (
                                <tr>
                                    <td className="px-4 py-3">{event.name}</td>
                                    <td className={`px-4 py-3 font-bold ${event.start_time < Date.now() ? "text-red-500" : "text-green-500"}`}>{event.start_time < Date.now() ? "Ended" : "Ongoing"}</td>
                                    <td className="px-4 py-3">{event.checked_in_attendees.length}</td>
                                    <td className="px-4 py-3">{event.registered_attendees.length}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <div className="flex flex-grow p-3">
                    <p className="text-white text-lg">Members</p>
                </div>

                <table className="table-auto w-full text-left whitespace-no-wrap">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Name</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Checked-in</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Absent</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            members.map(member => (
                                <tr>
                                    <td className="px-4 py-3">{member.first_name} {member.last_name}</td>
                                    <td className="px-4 py-3">{member.numCheckedIn}</td>
                                    <td className="px-4 py-3">{member.absent ? "Yes" : "No"}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default GroupHistoryDetail;