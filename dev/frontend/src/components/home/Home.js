import React from "react";
import logoIcon from '../../../src/icons/logoIcon.svg'
import attendanceIcon from "../../../src/icons/attendanceIcon.png"
import pinpointIcon from "../../../src/icons/pinpointIcon.png"
import analyticsIcon from "../../../src/icons/analyticsIcon.png"

const Home = () => {

    return (
        <div>
            <section class="text-gray-400 bg-gray-900 body-font flex-grow">
                <div class="container mx-auto flex px-20 md:flex-row flex-col items-center">
                    <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 class="title-font sm:text-6xl text-5xl font-medium mb-4 text-white">Effortlessly
                            <br class="lg:inline-block" />track
                            <br class="lg:inline-block" />attendance
                            <br class="lg:inline-block" />with GeoAttendance
                        </h1>
                        <p class="mb-8 leading-relaxed text-3xl">GeoAttendance is a powerful attendance tracking system with geofencing technology that allows you to effortlessly manage and track attendance in real-time.</p>
                        <div class="flex justify-center">
                            <button class="inline-flex text-white bg-blue-500 border-0 py-4 px-6 focus:outline-none hover:bg-blue-600 rounded text-2xl">Get Started</button>
                        </div>
                    </div>
                    <div class="lg:max-w-2xl lg:w-full md:w-1/2 w-5/6">
                        <img class="object-cover object-center rounded" src={logoIcon} alt="logo" />
                    </div>
                </div>
            </section>
            <section class="text-gray-400 bg-gray-900 body-font">
                <div class="container mx-auto flex px-20 py-24 md:flex-row flex-col items-center">
                    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
                        <img class="object-cover object-center rounded" alt="attendance icon" src={attendanceIcon} />
                    </div>
                    <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                        <h1 class="title-font sm:text-6xl text-5xl mb-4 font-medium text-white">Real-time attendance
                            <br class="lg:inline-block" />tracking
                        </h1>
                        <p class="mb-8 leading-relaxed text-3xl">With GeoAttendance, you can track attendance in real-time, ensuring accurate and up-to-date information. Say goodbye to manual attendance taking and enjoy the convenience of automated tracking.</p>
                    </div>
                </div>
            </section>
            <section class="text-gray-400 bg-gray-900 body-font flex-grow">
                <div class="container mx-auto flex px-20 py-10 md:flex-row flex-col items-center">
                    <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 class="title-font sm:text-6xl text-5xl font-medium mb-4 text-white">Geofencing
                            <br class="lg:inline-block" />technology for
                            <br class="lg:inline-block" />for accurate tracking
                        </h1>
                        <p class="mb-8 leading-relaxed text-3xl">Our geofencing technology ensures accurate tracking by creating virtual boundaries around designated areas. You can set up geofences for different locations and receive notifications when employees enter or leave these areas.</p>
                    </div>
                    <div class="lg:max-w-2xl lg:w-full md:w-1/2 w-5/6">
                        <img class="object-cover object-center rounded mx-auto" src={pinpointIcon} alt="pinpoint" />
                    </div>
                </div>
            </section>
            <section class="text-gray-400 bg-gray-900 body-font">
                <div class="container mx-auto flex px-20 py-24 md:flex-row flex-col items-center">
                    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
                        {/* <img class="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600" /> */}
                        <img class="object-cover object-center rounded" alt="analytics icon" src={analyticsIcon} />
                    </div>
                    <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                        <h1 class="title-font sm:text-6xl text-5xl mb-4 font-medium text-white">Effortless management and 
                            <br class="lg:inline-block" />reporting
                        </h1>
                        <p class="mb-8 leading-relaxed text-3xl">With GeoAttendance, you can track attendance in real-time, ensuring accurate and up-to-date information. Say goodbye to manual attendance taking and enjoy the convenience of automated tracking.</p>
                    </div>
                </div>
            </section>
        </div>


    )
}

export default Home;