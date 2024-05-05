import React, { useState, useEffect } from "react";
import bookIcon from "../../icons/book.png";
import allIcon from "../../icons/all.png";
import checkIcon from "../../icons/check.png";
import removeIcon from "../../icons/remove.png";
import Header from '../header/Header';
import Footer from '../footer/Footer';
import query from "../../lib/query.js";
import AttendanceHistory from "../attendancehistory/AttdendanceHistory";
import GroupHistory from "../grouphistory/GroupHistory";
import NoAccess from "../noaccess/NoAccess";

const Profile = () => {
    const [attedanceRate, setAttendanceRate] = useState(null);
    const user = JSON.parse(localStorage.getItem("pocketbase_auth"))?.model || null

    useEffect(() => {
        if (user) {
            const getAttendanceRate = async () => {
                const rate = await query.getAttendeeAttendance(user.id);
                setAttendanceRate(rate);
            }

            getAttendanceRate()
        }
    }, [])
    return (
        <div className="flex flex-col h-screen">
            <Header />
            {
                !user && (
                    <NoAccess title="Sorry, you don't have access to this page"/>
                )
            }
            {
                user && (
                    <section className="text-gray-400 bg-gray-900 body-font flex-grow">
                        <div className="container px-5 bg-gray-800 bg-opacity-40 rounded-lg py-10 mx-auto">
                            <div className="flex items-center mb-3">
                                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                                    <img className="object-cover object-center rounded" src={bookIcon} alt="bookIcon" width={30} />
                                </div>
                                <h1 className="text-white text-2xl title-font font-medium w-full">Account Details</h1>
                            </div>
                            <div className="flex flex-col sm:flex-row mt-10">
                                <div className="my-auto sm:w-1/5 text-center sm:pr-8 sm:py-8 mr-20 ml-10 xs:ml-16">
                                    <div className="w-40 h-40 rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10" viewBox="0 0 24 24">
                                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                    </div>
                                </div>
                                <div className="xs:mt-12">
                                    <h1 className="text-white text-2xl title-font font-medium w-full mb-5">{user.first_name} {user.last_name}</h1>
                                    <div className="container py-10 mx-auto">
                                        <div className="-my-8 divide-gray-800">
                                            <div className="py-4 flex flex-wrap md:flex-nowrap">
                                                <div className="md:w-64 md:mb-0 sm:w-40 sm:mb-0    xs:w-28 xs:mb-0 mb-6 flex-shrink-0 flex flex-col">
                                                    <span className="font-semibold title-font text-white">ID</span>
                                                </div>
                                                <div className="md:flex-grow">
                                                    <p className="">{user.id}</p>
                                                </div>
                                            </div>
                                            <div className="py-4 flex flex-wrap md:flex-nowrap">
                                                <div className="md:w-64 md:mb-0 sm:w-40 sm:mb-0    xs:w-28 xs:mb-0 mb-6 flex-shrink-0 flex flex-col">
                                                    <span className="font-semibold title-font text-white">Email</span>
                                                </div>
                                                <div className="md:flex-grow">
                                                    <p className="">{user.email}</p>
                                                </div>
                                            </div>
                                            <div className="py-4 flex border-gray-800 flex-wrap md:flex-nowrap">
                                                <div className="md:w-64 md:mb-0 sm:w-40 sm:mb-0    xs:w-28 xs:mb-0 mb-6 flex-shrink-0 flex flex-col">
                                                    <span className="font-semibold title-font text-white">Username</span>
                                                </div>
                                                <div className="md:flex-grow">
                                                    <p>{user.username}</p>
                                                </div>
                                            </div>
                                            <div className="py-4 flex border-gray-800 flex-wrap md:flex-nowrap">
                                                <div className="md:w-64 md:mb-0 sm:w-40 sm:mb-0    xs:w-28 xs:mb-0 mb-6 flex-shrink-0 flex flex-col">
                                                    <span className="font-semibold title-font text-white">Password</span>
                                                </div>
                                                <div className="md:flex-grow">
                                                    <p>Change Password?</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {user.subscription === 0 && attedanceRate && <div className="flex flex-wrap -m-4  mt-4">
                                        <div className="p-2 lg:w-1/4 md:w-1/2 sm:w-full flex-grow">
                                            <div className="flex rounded-lg bg-gray-800 bg-opacity-60 p-4 flex-col">
                                                <div className="flex items-center mb-3">
                                                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0">
                                                        <img className="object-cover object-center rounded" src={allIcon} alt="allIcon" width={30} />
                                                    </div>
                                                    <div className="mr-20">
                                                        <h2 className="text-white text-lg title-font font-medium w-full">{attedanceRate.total_events.length}</h2>
                                                        <p className="text-lg whitespace-nowrap">Total Attendance</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-2 lg:w-1/4 md:w-1/2 sm:w-full flex-grow">
                                            <div className="flex rounded-lg bg-gray-800 bg-opacity-60 p-4 flex-col px-auto">
                                                <div className="flex items-center mb-3">
                                                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                                                        <img className="object-cover object-center rounded" src={checkIcon} alt="checkIcon" width={30} />
                                                    </div>
                                                    <div className="mr-20">
                                                        <h2 className="text-white text-lg title-font font-medium w-full">{attedanceRate.total_check_ins.length}</h2>
                                                        <p className="text-lg whitespace-nowrap">Total Check-in</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-2 lg:w-1/4 md:w-1/2 sm:w-full flex-grow">
                                            <div className="flex rounded-lg bg-gray-800 bg-opacity-60 p-4 flex-col px-auto">
                                                <div className="flex items-center mb-3">
                                                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                                                        <img className="object-cover object-center rounded" src={checkIcon} alt="checkIcon" width={30} />
                                                    </div>
                                                    <div className="mr-20">
                                                        <h2 className="text-white text-lg title-font font-medium w-full">{attedanceRate.total_check_outs.length}</h2>
                                                        <p className="text-lg whitespace-nowrap">Total Check-out</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-2 lg:w-1/4 md:w-1/2 sm:w-full flex-grow">
                                            <div className="flex rounded-lg bg-gray-800 bg-opacity-60 p-4 flex-col">
                                                <div className="flex items-center mb-3">
                                                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                                                        <img className="object-cover object-center rounded" src={removeIcon} alt="removeIcon" width={30} />
                                                    </div>
                                                    <div className="mr-20">
                                                        <h2 className="text-white text-lg title-font font-medium w-full">{attedanceRate.total_absent.length}</h2>
                                                        <p className="text-lg whitespace-nowrap">Total Absent</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                        {user.subscription === 0 &&
                            attedanceRate &&
                            <AttendanceHistory attendanceHistory={attedanceRate} />
                        }

                        {
                            user.subscription === 1 &&
                            <GroupHistory />
                        }
                        {/* {
                        user.subscription === 1 && <section className="text-gray-400 bg-gray-900 body-font mt-8">
                            <div className="container px-5 bg-gray-800 bg-opacity-40 rounded-lg py-10 mx-auto">
                                <div className="flex items-center mb-3">
                                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                                        <img className="object-cover object-center rounded" src={bookIcon} alt="bookIcon" width={30} />
                                    </div>
                                    <h1 className="text-white text-2xl title-font font-medium w-full">Event History</h1>
                                </div>
                                <div className="flex flex-wrap -m-4  mt-4">
                                    
    
                                </div>
                            </div>
                        </section>
                    } */}
                    </section >
                )
            }
            <Footer />

        </div>
    )
}

export default Profile;