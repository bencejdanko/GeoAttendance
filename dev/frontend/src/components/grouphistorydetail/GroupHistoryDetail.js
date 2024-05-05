import React, { useEffect, useState } from "react"
import deleteIcon from "../../icons/delete.png";
import query from "../../lib/query";
import { Link } from 'react-router-dom';

const GroupHistoryDetail = (props) => {

    const [members, setMembers] = useState([])
    const [events, setEvents] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [modalEvent, setModalEvent] = useState(null)
    const [modalCheckedInMembers, setModalCheckedInMembers] = useState([])
    const [modalCheckedOutMembers, setModalCheckedOutMembers] = useState([])

    const [memberModalOpen, setMemberModalOpen] = useState(false)
    const [memberModalMembers, setMemberModalMembers] = useState(null)
    const [memberModalCheckedInEvents, setMemberModalCheckedInEvents] = useState(null)
    const [memberModalCheckedOutEvents, setMemberModalCheckedOutEvents] = useState(null)
    const [memberModalMissedEvents, setMemberModalMissedEvents] = useState()

    const openMemberModal = (member) => {
        setMemberModalOpen(true)
        setMemberModalMembers(member)
        const checkedIn = [];
        const checkedOut = [];
        const missed = [];
        events.forEach(event => {
            let memberId = member.record.id
            if (event.checked_out_attendees.includes(memberId)) {
                checkedOut.push(event);
            }

            if (event.checked_in_attendees.includes(memberId)) {
                checkedIn.push(event);
            }

            if (!event.checked_in_attendees.includes(memberId) && !event.checked_out_attendees.includes(memberId)) {
                missed.push(event)
            }
        });
        setMemberModalCheckedInEvents(checkedIn)
        setMemberModalCheckedOutEvents(checkedOut)
        setMemberModalMissedEvents(missed)
    }

    const closeMemberModal = () => {
        setMemberModalOpen(false)
    }

    const openModal = (event) => {
        setModalOpen(true)
        setModalEvent(event)

        const checkedIn = [];
        const checkedOut = [];

        members.forEach(member => {
            let memberId = member.record.id
            if (event.checked_out_attendees.includes(memberId)) {
                checkedOut.push(member);
            }

            if (event.checked_in_attendees.includes(memberId)) {
                checkedIn.push(member);
            }
        });

        setModalCheckedInMembers(checkedIn)
        setModalCheckedOutMembers(checkedOut)

    }

    const closeModal = () => {
        setModalOpen(false)
    }

    const handleNotify = async () => {
        let response = await query.sendNotifyEmail(props.group.id)
    }

    const handleDeleteEvent = async (event_id) => {
        let response = await query.removeEventFromGroup(props.group.id, event_id)
        window.location.reload()
    }

    const handleDeleteMember = async (member_id) => {
        let response = await query.removeAEventMemberInGroupANdAllGroupEvents(props.group.id, member_id)
        window.location.reload()
    }

    useEffect(() => {

        const getEvents = () => {
            let events = props.group.expand?.event_id
            if (!events) {
                setEvents([])
            } else {
                let rate = 0
                events = events.map(event => {
                    let checkedIn = event.checked_in_attendees
                    let checkedOut = event.checked_out_attendees
                    let checked = checkedIn.filter(id => checkedOut.includes(id)).length
                    console.log(`registered: ${event.registered_attendees.length} checked: ${checked.length}`)
                    let registered = event.registered_attendees.length

                    rate = registered > 0 ? checked / registered * 100 : 0
                    event.attendanceRate = rate.toFixed(0)
                    return event;
                })

                setEvents(events)
                return events
            }

        }

        const getMembers = (events) => {

            query.getGroupMemberDetails(props.group.id)
                .then((members) => {
                    members = members.members
                    members = members.map(member => {
                        
                        member.record = JSON.parse(member.record)
                        
                        if (!events || events.length === 0) {
                            member.attendanceRate = 0
                            return member
                        } 

                        let eventsInGroupRegistered = events.filter(event => event.registered_attendees.includes(member.record.id)) || []
                        let eventsInGroupAttended = events.filter(event => event.checked_out_attendees.includes(member.record.id) && event.checked_in_attendees.includes(member.record.id))
                        let rate = eventsInGroupRegistered.length > 0 ? eventsInGroupAttended.length / eventsInGroupRegistered.length * 100 : 0
                        member.attendanceRate = rate.toFixed(0)
                        return member
                    })
                    setMembers(members)
                })
        }
        let loadedEvents = getEvents()
        getMembers(loadedEvents)

    }, [])

    const handleDeleteGroup = async () => {
        await query.deleteGroup(props.group.id)
        props.deleteGroup(props.group.id)
    }

    return (
        <div className="p-4 lg:w-1/2 md:w-full sm:w-full">
            <div className="flex rounded-lg bg-gray-800 bg-opacity-60 p-5 flex-col items-center ">
                <div className="flex items-center mb-3">
                    <h2 className="text-white text-lg title-font font-medium w-full p-2">{props.group.name}</h2>
                    <button onClick={handleDeleteGroup}><img className="object-cover object-center rounded" src={deleteIcon} alt="deleteIcon" width={30} /></button>
                </div>

                <div className="flex flex-grow p-3">
                    <p className="text-white text-lg">Events</p>
                </div>

                <table className="table-auto w-full text-left whitespace-no-wrap">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Name</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Status</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Attendance Rate</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">{"\u00A0"}</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">{"\u00A0"}</th>

                        </tr>
                    </thead>

                    <tbody>
                        {
                            events.map(event => (
                                <tr>
                                    <td className="px-4 py-3 text-xl text-blue-600 underline cursor-pointer">
                                        <Link to={'/events/' + event.id}>{event.name}</Link>
                                    </td>
                                    <td className={`px-4 py-3 font-bold ${new Date(event.end_time) < Date.now() ? "text-red-500" : "text-green-500"}`}> {new Date(event.end_time) < Date.now() ? "Ended" : "Ongoing"}</td>
                                    {/* <td className="px-4 py-3">{event.checked_in_attendees.length}</td> */}
                                    {/* <td className="px-4 py-3">{event.checked_out_attendees.length}</td> */}


                                    <td className={`px-4 py-3 font-bold ${event.attendanceRate <= 50 ? 'text-red-500' :
                                        event.attendanceRate <= 75 ? 'text-orange-500' :
                                            'text-green-500'
                                        }`}>{
                                            event.attendanceRate


                                        }%</td>
                                    <td>
                                        <button onClick={() => { handleDeleteEvent(event.id) }}><img className="object-cover object-center rounded" src={deleteIcon} alt="deleteIcon" width={30} /></button>
                                    </td>
                                    <td>
                                        <button onClick={() => { openModal(event) }}>
                                            <svg width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 5.25C1.91421 5.25 2.25 4.91421 2.25 4.5C2.25 4.08579 1.91421 3.75 1.5 3.75C1.08579 3.75 0.75 4.08579 0.75 4.5C0.75 4.91421 1.08579 5.25 1.5 5.25ZM4 4.5C4 4.22386 4.22386 4 4.5 4H13.5C13.7761 4 14 4.22386 14 4.5C14 4.77614 13.7761 5 13.5 5H4.5C4.22386 5 4 4.77614 4 4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H13.5C13.7761 8 14 7.77614 14 7.5C14 7.22386 13.7761 7 13.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H13.5C13.7761 11 14 10.7761 14 10.5C14 10.2239 13.7761 10 13.5 10H4.5ZM2.25 7.5C2.25 7.91421 1.91421 8.25 1.5 8.25C1.08579 8.25 0.75 7.91421 0.75 7.5C0.75 7.08579 1.08579 6.75 1.5 6.75C1.91421 6.75 2.25 7.08579 2.25 7.5ZM1.5 11.25C1.91421 11.25 2.25 10.9142 2.25 10.5C2.25 10.0858 1.91421 9.75 1.5 9.75C1.08579 9.75 0.75 10.0858 0.75 10.5C0.75 10.9142 1.08579 11.25 1.5 11.25Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                        </button>
                                    </td>
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
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Attendance Rate</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">{"\u00A0"}</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">{"\u00A0"}</th>


                        </tr>
                    </thead>

                    <tbody>
                        {
                            members.map(member => (

                                <tr>
                                    <td className='px-4 py-3'>

                                        {
                                            member.record.avatar ?
                                                <img className="w-11 h-11 shrink-0 grow-0 rounded-full" src={`http://127.0.0.1:8090/api/files/users/${member.record.id}/${member.record.avatar}`} alt="avatar" width={30} />
                                                : <div className=" rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600">
                                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10" viewBox="0 0 24 24">
                                                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                                        <circle cx="12" cy="7" r="4"></circle>
                                                    </svg>
                                                </div>
                                        }
                                    </td>
                                    <td className="px-4 py-3">

                                        {member.record.first_name += " "}
                                        {member.record.last_name}


                                    </td>
                                    <td className={`px-4 py-3 font-bold ${member.attendanceRate <= 50 ? 'text-red-500' :
                                            member.attendanceRate <= 75 ? 'text-orange-500' :
                                                'text-green-500'
                                        }`}>{member.attendanceRate}%</td>
                                    <td>
                                        <button onClick={() => { handleDeleteMember(member.record.id) }}><img className="object-cover object-center rounded" src={deleteIcon} alt="deleteIcon" width={30} /></button>
                                    </td>
                                    <td>
                                        <button onClick={() => { openMemberModal(member) }}>
                                            <svg width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 5.25C1.91421 5.25 2.25 4.91421 2.25 4.5C2.25 4.08579 1.91421 3.75 1.5 3.75C1.08579 3.75 0.75 4.08579 0.75 4.5C0.75 4.91421 1.08579 5.25 1.5 5.25ZM4 4.5C4 4.22386 4.22386 4 4.5 4H13.5C13.7761 4 14 4.22386 14 4.5C14 4.77614 13.7761 5 13.5 5H4.5C4.22386 5 4 4.77614 4 4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H13.5C13.7761 8 14 7.77614 14 7.5C14 7.22386 13.7761 7 13.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H13.5C13.7761 11 14 10.7761 14 10.5C14 10.2239 13.7761 10 13.5 10H4.5ZM2.25 7.5C2.25 7.91421 1.91421 8.25 1.5 8.25C1.08579 8.25 0.75 7.91421 0.75 7.5C0.75 7.08579 1.08579 6.75 1.5 6.75C1.91421 6.75 2.25 7.08579 2.25 7.5ZM1.5 11.25C1.91421 11.25 2.25 10.9142 2.25 10.5C2.25 10.0858 1.91421 9.75 1.5 9.75C1.08579 9.75 0.75 10.0858 0.75 10.5C0.75 10.9142 1.08579 11.25 1.5 11.25Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {modalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    {modalEvent?.name}
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500 flex justify-center items-center font-bold">
                                        Checked in
                                    </p>
                                    <table className="table-auto w-full text-left whitespace-no-wrap">
                                        <tbody>
                                            {
                                                modalCheckedInMembers.map(member => (

                                                    <tr>
                                                        <td className='px-4 py-3'>
                                                            {
                                                                member.record.avatar ?
                                                                    <img className="w-11 h-11 shrink-0 grow-0 rounded-full" src={`http://127.0.0.1:8090/api/files/users/${member.record.id}/${member.record.avatar}`} alt="avatar" width={30} />
                                                                    : <div className=" rounded-full inline-flex items-center justify-center text-gray-600">
                                                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10" viewBox="0 0 24 24">
                                                                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                                                            <circle cx="12" cy="7" r="4"></circle>
                                                                        </svg>
                                                                    </div>

                                                            }
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {member.record.first_name += " "}
                                                            {member.record.last_name}
                                                        </td>
                                                    </tr>

                                                ))
                                            }
                                        </tbody>

                                    </table>
                                    {modalCheckedInMembers.length === 0 && (
                                        <div className="text-center text-gray-500 font-bold">
                                            No members checked in
                                        </div>
                                    )}
                                </div>

                                <div className="mt-2">
                                    <div className="text-sm text-gray-500 font-bold flex justify-center items-center">
                                        Checked out
                                    </div>
                                    <table className="table-auto w-full text-left whitespace-no-wrap">
                                        <tbody>
                                            {
                                                modalCheckedOutMembers.map(member => (
                                                    <tr>
                                                        <td className='px-4 py-3'>
                                                            {
                                                                member.record.avatar ?
                                                                    <img className="w-11 h-11 shrink-0 grow-0 rounded-full" src={`http://127.0.0.1:8090/api/files/users/${member.record.id}/${member.record.avatar}`} alt="avatar" width={30} />
                                                                    : <div className=" rounded-full inline-flex items-center justify-center text-gray-600">
                                                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10" viewBox="0 0 24 24">
                                                                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                                                            <circle cx="12" cy="7" r="4"></circle>
                                                                        </svg>
                                                                    </div>

                                                            }
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {member.record.first_name += " "}
                                                            {member.record.last_name}
                                                        </td>
                                                    </tr>

                                                ))
                                            }
                                        </tbody>
                                    </table>

                                    {modalCheckedOutMembers.length === 0 && (
                                        <div className="text-center text-gray-500 font-bold">
                                            No members checked out
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {memberModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    {memberModalMembers.record.first_name} {memberModalMembers.record.last_name}
                                </h3>
                            </div>

                            <div className="mt-2">
                                <div className="text-sm text-gray-500 font-bold flex justify-center items-center">
                                    Checked in
                                </div>
                                <table className="table-auto w-full text-left whitespace-no-wrap">
                                    <tbody>
                                        {
                                            memberModalCheckedInEvents.map(event => (
                                                <tr>
                                                    <td className="px-4 py-3">
                                                        {event.name}
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                {memberModalCheckedInEvents.length === 0 && (
                                    <div className="text-center text-gray-500 font-bold">
                                        No events checked in
                                    </div>
                                )}
                            </div>

                            <div className="mt-2">
                                <div className="text-sm text-gray-500 font-bold flex justify-center items-center">
                                    Checked out
                                </div>
                                <table className="table-auto w-full text-left whitespace-no-wrap">
                                    <tbody>
                                        {
                                            memberModalCheckedOutEvents.map(event => (
                                                <tr>
                                                    <td className="px-4 py-3">
                                                        {event.name}
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                {memberModalCheckedOutEvents.length === 0 && (
                                    <div className="text-center text-gray-500 font-bold">
                                        No events checked out
                                    </div>
                                )}
                            </div>

                            <div className="mt-2">
                                <div className="text-sm text-gray-500 font-bold flex justify-center items-center">
                                    Missed
                                </div>
                                <table className="table-auto w-full text-left whitespace-no-wrap">
                                    <tbody>
                                        {
                                            memberModalMissedEvents.map(event => (
                                                <tr>
                                                    <td className="px-4 py-3">
                                                        {event.name}
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                {memberModalMissedEvents.length === 0 && (
                                    <div className="text-center text-gray-500 font-bold">
                                        No events missed
                                    </div>
                                )}
                            </div>

                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeMemberModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default GroupHistoryDetail;