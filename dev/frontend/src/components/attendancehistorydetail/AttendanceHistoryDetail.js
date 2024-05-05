import React from "react"
import clockIcon from "../../icons/clock.png";

const AttendanceHistoryDetail = (props) => {


    return (
        <div className="p-4 flex-grow grid auto-rows-fr lg:w-1/3 md:w-1/2 sm:w-full xs:w-full">
            <div className="flex rounded-lg bg-gray-800 bg-opacity-60 p-8 flex-col">
                <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0">
                        <img className="object-cover object-center rounded" src={clockIcon} alt="clockIcon" width={30} />
                    </div>
                    <h2 className="text-white text-lg title-font font-medium w-full whitespace-nowrap">{new Date(props.detail.start_time).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h2>
                    {
                        props.absent &&
                        <span className="inline-block py-1 px-2 rounded bg-gray-800 text-red-400 text-opacity-75 text-xs font-medium tracking-widest">Absent</span>

                    }
                    {
                        props.checkin &&
                        <span className="inline-block py-1 px-2 rounded bg-gray-800 text-green-400 text-opacity-75 text-xs font-medium tracking-widest whitespace-nowrap">Check-in</span>

                    }
                </div>
                <div className="flex flex-grow mt-5">
                    <div className="md:w-1/2 sm:w-1/2 flex flex-col items-start">
                        <p className="leading-relaxed text-lg w-full xs:mr-20">Start Time</p>
                        <h2 className="text-white text-lg title-font font-medium mt-5 whitespace-nowrap">{new Date(props.detail.start_time).toLocaleTimeString()}</h2>
                    </div>
                    <div className="md:w-1/2 sm:w-1/2 flex flex-col items-start">
                        <p className="leading-relaxed text-lg w-full">End Time</p>
                        <h2 className="text-white text-lg title-font font-medium mt-5 whitespace-nowrap">{new Date(props.detail.end_time).toLocaleTimeString()}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AttendanceHistoryDetail;
