import React from "react";
import logoIcon from '../../../src/icons/logoIcon.svg'
import attendanceIcon from "../../../src/icons/attendanceIcon.png"
import pinpointIcon from "../../../src/icons/pinpointIcon.png"
import analyticsIcon from "../../../src/icons/analyticsIcon.png"

const Home = () => {

    return (
        <div>
            <section className="text-gray-400 bg-gray-900 body-font flex-grow py-12">
                <div className="container mx-auto flex px-40 md:flex-row flex-col items-center">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl font-medium mb-4 text-white">Effortlessly
                            <br className="lg:inline-block" />track
                            <br className="lg:inline-block" />attendance
                            <br className="lg:inline-block" />with GeoAttendance
                        </h1>
                        <p className="mb-8 leading-relaxed text-2xl">GeoAttendance is a powerful attendance tracking system with geofencing technology that allows you to effortlessly manage and track attendance in real-time.</p>
                    </div>
                    <div className="lg:max-w-sm lg:w-full md:w-1/2 w-5/6">
                        <img className="object-cover object-center rounded" src={logoIcon} alt="logo" />
                    </div>
                </div>
            </section>
            <section className="text-gray-400 bg-gray-900 body-font">
                <div className="container mx-auto flex px-40 py-24 md:flex-row flex-col items-center">
                    <div className="lg:max-w-sm lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
                        <img className="object-cover object-center rounded" alt="attendance icon" src={attendanceIcon} />
                    </div>
                    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Real-time attendance
                            <br className="lg:inline-block" />tracking
                        </h1>
                        <p className="mb-8 leading-relaxed text-2xl">With GeoAttendance, you can track attendance in real-time, ensuring accurate and up-to-date information. Say goodbye to manual attendance taking and enjoy the convenience of automated tracking.</p>
                    </div>
                </div>
            </section>
            <section className="text-gray-400 bg-gray-900 body-font flex-grow">
                <div className="container mx-auto flex px-40 py-10 md:flex-row flex-col items-center">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl font-medium mb-4 text-white">Geofencing
                            <br className="lg:inline-block" />technology for
                            <br className="lg:inline-block" />for accurate tracking
                        </h1>
                        <p className="mb-8 leading-relaxed text-2xl">Our geofencing technology ensures accurate tracking by creating virtual boundaries around designated areas. You can set up geofences for different locations and receive notifications when employees enter or leave these areas.</p>
                    </div>
                    <div className="lg:max-w-sm lg:w-full md:w-1/2 w-5/6">
                        <img className="object-cover object-center rounded mx-auto" src={pinpointIcon} alt="pinpoint" />
                    </div>
                </div>
            </section>
            <section className="text-gray-400 bg-gray-900 body-font">
                <div className="container mx-auto flex px-40 py-24 md:flex-row flex-col items-center">
                    <div className="lg:max-w-sm lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
                        <img className="object-cover object-center rounded" alt="analytics icon" src={analyticsIcon} />
                    </div>
                    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Effortless management and 
                            <br className="lg:inline-block" />reporting
                        </h1>
                        <p className="mb-8 leading-relaxed text-2xl">With GeoAttendance, you can track attendance in real-time, ensuring accurate and up-to-date information. Say goodbye to manual attendance taking and enjoy the convenience of automated tracking.</p>
                    </div>
                </div>
            </section>
        </div>


    )
}

export default Home;