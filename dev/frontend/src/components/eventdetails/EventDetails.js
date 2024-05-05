import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";
import deleteIcon from "../../icons/delete.png";
import checkIcon from "../../icons/check.png";
import blockIcon from "../../icons/blocked.png";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Header from "../header/Header";
import Footer from "../footer/Footer";
import query from "../../lib/query";
import { useParams } from 'react-router-dom';
import NoAccess from "../noaccess/NoAccess";

const EventDetails = () => {
    const fileInputRef = useRef();
    // const location = useLocation();
    // const { events, index } = location.state;
    const [event, setEvent] = useState({})
    // if event associted to a group, use group's registered attendees
    // if not, use event's registered attendees
    const [attendees, setAttendees] = useState(
        // event.expand?.group_id?.expand?.registered_attendees
        //     ? event.expand.group_id.expand.registered_attendees
        //     : (event.expand?.registered_attendees
        //         ? event.expand.registered_attendees : 
        [])
    // );
    const [isOpen, setIsOpen] = useState(-1);
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem("pocketbase_auth"))?.model || null


    useEffect(() => {
        const fetchEvent = async () => {
            const response = await query.getEvent(id);
            console.log(response[0])
            const tempAttendees = response[0].expand?.group_id?.expand?.registered_attendees
                ? response[0].expand.group_id.expand.registered_attendees
                : (response[0].expand?.registered_attendees
                    ? response[0].expand.registered_attendees :
                    []);
            const updatedAttendees = tempAttendees.map(attendee => ({
                ...attendee,
                check_in: response[0].checked_in_attendees.includes(attendee.id),
                check_out: response[0].checked_out_attendees.includes(attendee.id)
            }))
            console.log(updatedAttendees)
            setAttendees(updatedAttendees)

            // if (response[0].group_id !== ""
            //     && response[0].expand.group_id.expand
            //     && response[0].expand.group_id.expand.registered_attendees !== []
            //     && response[0].registered_attendees.length === 0) {
            //     const attendeeIds = [];
            //     response[0].expand.group_id.expand.registered_attendees.forEach(data => {
            //         attendeeIds.push(data.id)
            //     })
            //     const updateResponse = async () => {
            //         await query.updateEvent(event.id, {
            //             ...event,
            //             registered_attendees: attendeeIds
            //         });
            //     }
            //     updateResponse()
            // }
            // Check if event has changed before updating
            if (JSON.stringify(response[0]) !== JSON.stringify(event)) {
                setEvent(response[0]);
            }
            // setEvent(response[0])

        }

        fetchEvent()
    }, [event.registered_attendees])

    const closeModal = () => {
        setIsOpen(-1);
    }

    const openModal = (index) => {
        setIsOpen(index);
    }

    const handleDeactivate = async () => {
        const deletedUserId = isOpen;
        closeModal();
        const updatedAttendees = attendees.filter(attendee => attendee.id !== deletedUserId);
        setAttendees(updatedAttendees);
        if (event.group_id !== "") {
            await query.removeAEventMemberInGroupANdAllGroupEvents(event.group_id, deletedUserId)
        }
        else { // does not have group
            await query.removeEventMember(event.id, deletedUserId);
        }

    }

    const handleManualCheckIn = async (idx, option) => {
        if (option === "check-in") {
            const updatedAttendees = [...attendees];
            updatedAttendees[idx].check_in = 1;
            setAttendees(updatedAttendees);
            const tempArr = event.checked_in_attendees;
            tempArr.push(updatedAttendees[idx].id);
            await query.updateEvent(event.id, {
                ...event,
                checked_in_attendees: tempArr
            });
        } else {
            const updatedAttendees = [...attendees];
            updatedAttendees[idx].check_out = 1;
            setAttendees(updatedAttendees);
            const tempArr = event.checked_out_attendees;
            tempArr.push(updatedAttendees[idx].id);
            await query.updateEvent(event.id, {
                ...event,
                checked_out_attendees: tempArr
            });
        }


    }

    const handleFileUpload = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsBinaryString(e.target.files[0]);
            reader.onload = async (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: "binary" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const parseData = XLSX.utils.sheet_to_json(sheet);
                console.log(parseData);
                const updatedParseData = parseData.map(user => ({
                    ...user, // Spread the existing data
                    check_in: false, // Add or update the check_in key
                    check_out: false
                }));

                console.log(updatedParseData);
                console.log(event)
                const attendeeIds = [];
                updatedParseData.forEach(data => {
                    attendeeIds.push(data.No)
                })


                let noValues = updatedParseData.map(item => item.No);
                await query.updateGroupEventsWithNewMembers(event.expand.group_id.id, noValues)

                const response = await query.updateEvent(event.id, {
                    ...event,
                    registered_attendees: attendeeIds
                });

                console.log(response)
                console.log(updatedParseData)
                // handle error 
                if (response instanceof Error) {
                    return;
                }

                const eventResponse = await query.getEvent(event.id);
                setEvent(eventResponse);
                if (eventResponse instanceof Error) {
                    return;
                }

                const updatedAttendees = eventResponse[0].expand.registered_attendees.map(attendee => ({
                    ...attendee,
                    check_in: response.checked_in_attendees.includes(attendee.id),
                    check_out: event.checked_out_attendees.includes(attendee.id)
                }))
                console.log(updatedAttendees)
                setAttendees(updatedAttendees)

                // update group api
                if (event.group_id !== "") {
                    const newGroupData = {
                        "event_id": event.expand.group_id.event_id,
                        "host": event.expand.group_id.host,
                        "name": event.expand.group_id.name,
                        "registered_attendees": attendeeIds
                    };
                    const tempGroup = await query.updateGroup(event.group_id, newGroupData);
                    // handle error 
                    if (tempGroup instanceof Error) {
                        return;
                    }
                }
            }
        }

    }
    return (
        <div className="flex flex-col h-screen">
            <Header />
            {
                user && (
                    <section className="text-gray-400 bg-gray-900 body-font flex-grow">

                        <div className="container px-5 py-10 mx-auto">
                            <div className="flex flex-col text-center w-full mb-10">
                                <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">Event {event.name}</h1>
                                <div className="flex pl-4 mt-4 lg:w-full w-full mx-auto">
                                    <button className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded" onClick={() => fileInputRef.current.click()}>Add Attendees</button>
                                    <input onChange={handleFileUpload} accept=".xlsx, .xls" multiple={false} ref={fileInputRef} type='file' hidden />
                                </div>
                            </div>


                            <div className="lg:w-full w-full mx-auto overflow-auto">
                                <table className="table-auto w-full text-left whitespace-no-wrap">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 rounded-tl rounded-bl">Id</th>
                                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 rounded-tl rounded-bl">First Name</th>
                                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Last Name</th>
                                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Username</th>
                                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Check-in</th>
                                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Check-out</th>
                                            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            attendees.map((attendee, idx) => (
                                                <tr key={idx}>
                                                    <td className="px-4 py-3">{attendee.id}</td>
                                                    <td className="px-4 py-3">{attendee.first_name}</td>
                                                    <td className="px-4 py-3">{attendee.last_name}</td>
                                                    <td className="px-4 py-3">{attendee.username}</td>
                                                    {/* <td className="px-4 py-3">{attendee.Email}</td> */}
                                                    {
                                                        !attendee.check_in && (
                                                            <td className="px-4 py-3">Not Check-in
                                                                <div className="w-8 h-8 ml-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                                                                    <button onClick={() => handleManualCheckIn(idx, "check-in")}>
                                                                        <img className="object-cover object-center rounded" src={blockIcon} alt="checkblockIconIcon" width={20} />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        )
                                                    }
                                                    {
                                                        attendee.check_in && (
                                                            <td className="px-4 py-3">Checked-in
                                                                <div className="w-8 h-8 ml-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                                                                    <button>
                                                                        <img className="object-cover object-center rounded" src={checkIcon} alt="checkIcon" width={20} />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        )
                                                    }
                                                    {
                                                        !attendee.check_out && (
                                                            <td className="px-4 py-3">Not Check-out
                                                                <div className="w-8 h-8 ml-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                                                                    <button onClick={() => handleManualCheckIn(idx, "check-out")}>
                                                                        <img className="object-cover object-center rounded" src={blockIcon} alt="checkblockIconIcon" width={20} />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        )
                                                    }
                                                    {
                                                        attendee.check_out && (
                                                            <td className="px-4 py-3">Checked-out
                                                                <div className="w-8 h-8 ml-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                                                                    <button>
                                                                        <img className="object-cover object-center rounded" src={checkIcon} alt="checkIcon" width={20} />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        )
                                                    }
                                                    <td className="px-4 py-3">
                                                        <button onClick={() => openModal(attendee.id)}>
                                                            <img className="object-cover object-center rounded" src={deleteIcon} alt="deleteIcon" width={20} />
                                                        </button>

                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            {/* <div className="flex pl-4 mt-4 lg:w-full w-full mx-auto">
                <a className="text-blue-400 inline-flex items-center md:mb-2 lg:mb-0">Learn More
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </a>
                <button className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded" onClick={() => fileInputRef.current.click()}>Add More</button>
                <input onChange={handleFileUpload} accept=".xlsx, .xls" multiple={false} ref={fileInputRef} type='file' hidden />
            </div> */}
                        </div>
                        <Transition appear show={isOpen !== -1} as={Fragment}>
                            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-black/25" />
                                </Transition.Child>

                                <div className="fixed inset-0 overflow-y-auto">
                                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                {/* <div className="flex flex-wrap -m-2">
                                    <div className="p-2 w-1/2">
                                        <div className="relative">
                                            <label for="name" className="leading-7 text-md">Name</label>
                                            <input type="text" id="name" name="name" className="mt-5 w-full bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div className="p-2 w-1/2">
                                        <div className="relative">
                                            <label for="email" className="leading-7 text-md">Email</label>
                                            <input type="email" id="email" name="email" className="mt-5 w-full bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                </div> */}

                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-lg font-medium leading-6 text-gray-900">Deactivate account</Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Are you sure you want to deactivate your account? All of your data
                                                        will be permanently removed. This action cannot be undone.
                                                    </p>
                                                </div>
                                                <div className="mt-4 text-center">
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center rounded-md border border-gray bg-white-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                        onClick={closeModal}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                        onClick={handleDeactivate}
                                                    >
                                                        Deactivate
                                                    </button>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                    </section>
                )
            }
            {
                !user && (
                    <NoAccess title="Sorry, you don't have access to this page" />
                )
            }
            <Footer />
        </div>

    )
}

export default EventDetails;