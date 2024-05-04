import React, { useEffect, useState } from "react"
import deleteIcon from "../../icons/delete.png";
import query from "../../lib/query";

const GroupHistoryDetail = (props) => {

    const [members, setMembers] = useState([])
    const [events, setEvents] = useState([])

    const handleNotify = async () => {
        let response = await query.sendNotifyEmail(props.group.id)
        console.log(response)
    }

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
            let members = await query.getGroupMemberDetails(props.group.id)
            setMembers(members.members)
        }
        getMembers()
        getEvents()

    }, [])

    return (
        <div className="p-4 lg:w-1/2 md:w-full sm:w-full">
            <div className="flex rounded-lg bg-gray-800 bg-opacity-60 p-5 flex-col items-center ">
                <div className="flex items-center mb-3">
                    <h2 className="text-white text-lg title-font font-medium w-full p-2">{props.group.name}</h2>
                    <button onClick={() => query.deleteGroup(props.group.id)}><img className="object-cover object-center rounded" src={deleteIcon} alt="deleteIcon" width={30} /></button>
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
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Checked-out</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Registered</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            events.map(event => (
                                <tr>
                                    <td className="px-4 py-3">{event.name}</td>
                                    <td className={`px-4 py-3 font-bold ${new Date(event.end_time) < Date.now() ? "text-red-500" : "text-green-500"}`}> {new Date(event.end_time) < Date.now() ? "Ended" : "Ongoing"}</td>
                                    <td className="px-4 py-3">{event.checked_in_attendees.length}</td>
                                    <td className="px-4 py-3">{event.checked_out_attendees.length}</td>
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
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800"></th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Name</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Checked-in</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Checked-out</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Absent</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            members.map(member => (

                                <tr>
                                    <td className='px-4 py-3'>

                                        {
                                            JSON.parse(member.record).avatar ?
                                                <img className="w-11 h-11 shrink-0 grow-0 rounded-full" src={`http://127.0.0.1:8090/api/files/users/${JSON.parse(member.record).id}/${JSON.parse(member.record).avatar}`} alt="avatar" width={30} />
                                                : <div className=" rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600">
                                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10" viewBox="0 0 24 24">
                                                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                                        <circle cx="12" cy="7" r="4"></circle>
                                                    </svg>
                                                </div>
                                        }
                                    </td>
                                    <td className="px-4 py-3">

                                        {JSON.parse(member.record).first_name += " "}
                                        {JSON.parse(member.record).last_name}


                                    </td>
                                    <td className="px-4 py-3">{member.checked_in}</td>
                                    <td className="px-4 py-3">{member.checked_out}</td>
                                    <td className="px-4 py-3">{member.absent}</td>
                                    <td className="px-4 py-3">{member.record.id}</td>
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