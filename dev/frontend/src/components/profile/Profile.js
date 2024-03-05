import React from "react";
import clockIcon from "../../icons/clock.png"
import bookIcon from "../../icons/book.png"

const Profile = (props) => {
    return (
        <section className="text-gray-400 bg-gray-900 body-font flex-grow">
            <div class="container px-5 bg-gray-800 bg-opacity-40 rounded-lg py-10 mx-auto">
                <div class="flex items-center mb-3">
                    <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                        <img className="object-cover object-center rounded" src={bookIcon} alt="bookIcon" width={30} />
                    </div>
                    <h1 class="text-white text-2xl title-font font-medium w-full">Account Details</h1>
                </div>
                <div className="flex flex-col sm:flex-row mt-10">
                    <div className="my-auto sm:w-1/5 text-center sm:pr-8 sm:py-8 mr-20 ml-10">
                        <div className="w-40 h-40 rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10" viewBox="0 0 24 24">
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                    </div>
                    <div className="">
                        <h1 class="text-white text-2xl title-font font-medium w-full mb-5">First Name</h1>
                        <div class="container py-10 mx-auto">
                            <div class="-my-8 divide-gray-800">
                                <div class="py-4 flex flex-wrap md:flex-nowrap">
                                    <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                                        <span class="font-semibold title-font text-white">Email Address</span>
                                    </div>
                                    <div class="md:flex-grow">
                                        <p className="">example@example.com</p>
                                    </div>
                                </div>
                                <div class="py-4 flex border-gray-800 flex-wrap md:flex-nowrap">
                                    <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                                        <span class="font-semibold title-font text-white">Username</span>
                                    </div>
                                    <div class="md:flex-grow">
                                        <p>username</p>
                                    </div>
                                </div>
                                <div class="py-4 flex border-gray-800 flex-wrap md:flex-nowrap">
                                    <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                                        <span class="font-semibold title-font text-white">Password</span>
                                    </div>
                                    <div class="md:flex-grow">
                                        <p>Change Password?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-wrap -m-4  mt-4">
                            <div class="p-4 md:w-1/3 sm:w-full">
                                <div class="flex rounded-lg bg-gray-800 bg-opacity-60 p-8 flex-col">
                                    <div class="flex items-center mb-3">
                                        <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0">
                                            <img className="object-cover object-center rounded" src={clockIcon} alt="clockIcon" width={30} />
                                        </div>
                                        <div className="mr-20">
                                            <h2 className="text-white text-lg title-font font-medium w-full">102</h2>
                                            <p className="text-lg whitespace-nowrap">Total Attendance</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="p-4 md:w-1/3 sm:w-full">
                                <div class="flex rounded-lg bg-gray-800 bg-opacity-60 p-8 flex-col px-auto">
                                    <div class="flex items-center mb-3">
                                        <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0">
                                            <img className="object-cover object-center rounded" src={clockIcon} alt="clockIcon" width={30} />
                                        </div>
                                        <div className="mr-20">
                                            <h2 className="text-white text-lg title-font font-medium w-full">102</h2>
                                            <p className="text-lg whitespace-nowrap">Total On-Time</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="p-4 md:w-1/3 sm:w-full">
                                <div class="flex rounded-lg bg-gray-800 bg-opacity-60 p-8 flex-col">
                                    <div class="flex items-center mb-3">
                                        <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0">
                                            <img className="object-cover object-center rounded" src={clockIcon} alt="clockIcon" width={30} />
                                        </div>
                                        <div className="mr-20">
                                            <h2 className="text-white text-lg title-font font-medium w-full">102</h2>
                                            <p className="text-lg whitespace-nowrap">Total Absent</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section class="text-gray-400 bg-gray-900 body-font mt-8">
                <div class="container px-5 bg-gray-800 bg-opacity-40 rounded-lg py-10 mx-auto">
                    <div class="flex items-center mb-3">
                        <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                            <img className="object-cover object-center rounded" src={bookIcon} alt="bookIcon" width={30} />
                        </div>
                        <h1 class="text-white text-2xl title-font font-medium w-full">Attendance History</h1>
                    </div>
                    <div class="flex flex-wrap -m-4  mt-4">
                        <div class="p-4 md:w-1/3 sm:w-full">
                            <div class="flex rounded-lg bg-gray-800 bg-opacity-60 p-8 flex-col">
                                <div class="flex items-center mb-3">
                                    <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0">
                                        <img className="object-cover object-center rounded" src={clockIcon} alt="clockIcon" width={30} />
                                    </div>
                                    <h2 class="text-white text-lg title-font font-medium w-full">March 4th, 2024</h2>
                                    <span class="inline-block py-1 px-2 rounded bg-gray-800 text-green-400 text-opacity-75 text-xs font-medium tracking-widest">OnTime</span>
                                </div>
                                <div className="flex flex-grow mt-5">
                                    <div className="md:w-1/2 sm:w-1/2 flex flex-col items-start">
                                        <p className="leading-relaxed text-lg w-full">Check-in Time</p>
                                        <h2 class="text-white text-lg title-font font-medium mt-5">11:11</h2>
                                    </div>
                                    <div className="md:w-1/2 sm:w-1/2 flex flex-col items-start">
                                        <p className="leading-relaxed text-lg w-full">Check-out Time</p>
                                        <h2 class="text-white text-lg title-font font-medium mt-5">11:20</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="p-4 md:w-1/3 sm:w-full">
                            <div class="flex rounded-lg bg-gray-800 bg-opacity-60 p-8 flex-col">
                                <div class="flex items-center mb-3">
                                    <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0">
                                        <img className="object-cover object-center rounded" src={clockIcon} alt="clockIcon" width={30} />
                                    </div>
                                    <h2 class="text-white text-lg title-font font-medium w-full">March 4th, 2024</h2>
                                    <span class="inline-block py-1 px-2 rounded bg-gray-800 text-green-400 text-opacity-75 text-xs font-medium tracking-widest">OnTime</span>
                                </div>
                                <div class="flex flex-grow mt-5">
                                    <div className="md:w-1/2 sm:w-1/2 flex flex-col items-start">
                                        <p className="leading-relaxed text-lg w-full">Check-in Time</p>
                                        <h2 class="text-white text-lg title-font font-medium mt-5">11:11</h2>
                                    </div>
                                    <div className="md:w-1/2 sm:w-1/2 flex flex-col items-start">
                                        <p className="leading-relaxed text-lg w-full">Check-out Time</p>
                                        <h2 class="text-white text-lg title-font font-medium mt-5">11:20</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="p-4 md:w-1/3 sm:w-full">
                            <div class="flex rounded-lg bg-gray-800 bg-opacity-60 p-8 flex-col">
                                <div class="flex items-center mb-3">
                                    <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0">
                                        <img className="object-cover object-center rounded" src={clockIcon} alt="clockIcon" width={30} />
                                    </div>
                                    <h2 class="text-white text-lg title-font font-medium w-full">March 4th, 2024</h2>
                                    <span class="inline-block py-1 px-2 rounded bg-gray-800 text-red-400 text-opacity-75 text-xs font-medium tracking-widest">Absent</span>
                                </div>
                                <div class="flex flex-grow mt-5">
                                    <div className="md:w-1/2 sm:w-1/2 flex flex-col items-start">
                                        <p className="leading-relaxed text-lg w-full">Check-in Time</p>
                                        <h2 class="text-white text-lg title-font font-medium mt-5">11:11</h2>
                                    </div>
                                    <div className="md:w-1/2 sm:w-1/2 flex flex-col items-start">
                                        <p className="leading-relaxed text-lg w-full">Check-out Time</p>
                                        <h2 class="text-white text-lg title-font font-medium mt-5">11:20</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section >
    )
}

export default Profile;