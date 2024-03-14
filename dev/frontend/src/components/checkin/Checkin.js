import React, {useState} from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";

const Checkin = () => {
    const [eventCode, setEventCode] = useState("");

    const handleCheckIn = () => {
        // Check if there is any event has this event code 

        // Check if this user is registered for this event

        // Check if the current location is within the radius
        
        // confirm
    }

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <section className="text-gray-400 bg-gray-900 body-font relative flex-grow">
                <div className="px-5 py-10 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-5 text-white tracking-widest">Check-in</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-lg">Enter the event code below to check in.</p>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            <div className="px-40 w-full">
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="eventcode"
                                        name="eventcode"
                                        className="my-5 w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        value={eventCode}
                                        onChange={(e) => setEventCode(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="p-2 mt-7 w-full">
                                <button className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg" onClick={handleCheckIn}>Check-in</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Checkin;