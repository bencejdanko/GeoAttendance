import React from "react"
import clockIcon from "../../icons/clock.png";
import bookIcon from "../../icons/book.png";

const AttendanceHistory = (props) => {
    console.log(props.attendanceHistory)
    return (
        <section className="text-gray-400 bg-gray-900 body-font mt-8">
            <div className="container px-5 bg-gray-800 bg-opacity-40 rounded-lg py-10 mx-auto">
                <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                        <img className="object-cover object-center rounded" src={bookIcon} alt="bookIcon" width={30} />
                    </div>
                    <h1 className="text-white text-2xl title-font font-medium w-full">Attendance History</h1>
                </div>
                <div className="flex flex-wrap -m-4  mt-4">
                    <div className="p-4 md:w-1/3 sm:w-full">
                        <div className="flex rounded-lg bg-gray-800 bg-opacity-60 p-8 flex-col">
                            <div className="flex items-center mb-3">
                                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0">
                                    <img className="object-cover object-center rounded" src={clockIcon} alt="clockIcon" width={30} />
                                </div>
                                <h2 className="text-white text-lg title-font font-medium w-full">March 4th, 2024</h2>
                                <span className="inline-block py-1 px-2 rounded bg-gray-800 text-green-400 text-opacity-75 text-xs font-medium tracking-widest whitespace-nowrap">Check-in</span>
                            </div>
                            <div className="flex flex-grow mt-5">
                                <div className="md:w-1/2 sm:w-1/2 flex flex-col items-start">
                                    <p className="leading-relaxed text-lg w-full">Check-in Time</p>
                                    <h2 className="text-white text-lg title-font font-medium mt-5">11:11</h2>
                                </div>
                                <div className="md:w-1/2 sm:w-1/2 flex flex-col items-start">
                                    <p className="leading-relaxed text-lg w-full">Check-out Time</p>
                                    <h2 className="text-white text-lg title-font font-medium mt-5">11:20</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/3 sm:w-full">
                        <div className="flex rounded-lg bg-gray-800 bg-opacity-60 p-8 flex-col">
                            <div className="flex items-center mb-3">
                                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0">
                                    <img className="object-cover object-center rounded" src={clockIcon} alt="clockIcon" width={30} />
                                </div>
                                <h2 className="text-white text-lg title-font font-medium w-full">March 4th, 2024</h2>
                                <span className="inline-block py-1 px-2 rounded bg-gray-800 text-green-400 text-opacity-75 text-xs font-medium tracking-widest whitespace-nowrap">Check-in</span>
                            </div>
                            <div className="flex flex-grow mt-5">
                                <div className="md:w-1/2 sm:w-1/2 flex flex-col items-start">
                                    <p className="leading-relaxed text-lg w-full">Check-in Time</p>
                                    <h2 className="text-white text-lg title-font font-medium mt-5">11:11</h2>
                                </div>
                                <div className="md:w-1/2 sm:w-1/2 flex flex-col items-start">
                                    <p className="leading-relaxed text-lg w-full">Check-out Time</p>
                                    <h2 className="text-white text-lg title-font font-medium mt-5">11:20</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/3 sm:w-full">
                        <div className="flex rounded-lg bg-gray-800 bg-opacity-60 p-8 flex-col">
                            <div className="flex items-center mb-3">
                                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0">
                                    <img className="object-cover object-center rounded" src={clockIcon} alt="clockIcon" width={30} />
                                </div>
                                <h2 className="text-white text-lg title-font font-medium w-full">March 4th, 2024</h2>
                                <span className="inline-block py-1 px-2 rounded bg-gray-800 text-red-400 text-opacity-75 text-xs font-medium tracking-widest">Absent</span>
                            </div>
                            <div className="flex flex-grow mt-5">
                                <div className="md:w-1/2 sm:w-1/2 flex flex-col items-start">
                                    <p className="leading-relaxed text-lg w-full">Check-in Time</p>
                                    <h2 className="text-white text-lg title-font font-medium mt-5">11:11</h2>
                                </div>
                                <div className="md:w-1/2 sm:w-1/2 flex flex-col items-start">
                                    <p className="leading-relaxed text-lg w-full">Check-out Time</p>
                                    <h2 className="text-white text-lg title-font font-medium mt-5">11:20</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default AttendanceHistory;
