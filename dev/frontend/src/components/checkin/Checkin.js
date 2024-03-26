import React, { useState } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import query from "../../lib/query.js";

const Checkin = () => {
    const [eventCode, setEventCode] = useState("");
    const [checkInError, setCheckInError] = useState("");
    const [checkInSuccess, setCheckInSuccess] = useState("");
    const [isCheckInDisabled, setIsCheckInDisabled] = useState(true);
    const [currentGeo, setCurrentGeo] = useState(null);

    const reset = () => {
        setEventCode("");
        setCheckInError("");
        setCheckInSuccess("");
    }

    const handleCheckIn = async () => {
        reset();
        // check if we able to get the current location of the user
        if (currentGeo) {
            let data = {
                code: eventCode,
                latitude: currentGeo.lat,
                longitude: currentGeo.lng,
            }

            const checkInData = await query.checkin(data);
            if (checkInData instanceof Error) {
                setCheckInError(checkInData.message);
            } else {
                setCheckInSuccess("Successfully checked-in.");
            }

        } else {
            setCheckInError("Please update your location to check-in.");
        }
    }

    const handleGetCurrentLocation = () => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
        } else {
            console.log("Geolocation not supported")
        }
    }

    const errorCallback = () => {
        console.log("Cannot retrieve the current location")
        setIsCheckInDisabled(true);
    }

    const successCallback = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setCurrentGeo({lat: position.coords.latitude, lng: position.coords.longitude});
        setIsCheckInDisabled(false);
        console.log(`Latitude: ${latitude}, longitude: ${longitude}`)
    }

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <section className="text-gray-400 bg-gray-900 body-font relative flex-grow">
                <div className="px-5 py-10 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-5 text-white tracking-widest">Check-in</h1>
                        <p className="leading-relaxed text-lg text-blue-500"><button onClick={handleGetCurrentLocation}>Get current location</button></p>

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
                                {
                                    !checkInSuccess && <p className="text-red-600 text-center mb-9">{checkInError}</p>
                                }
                                {
                                    checkInSuccess && <p className="text-red-600 text-center mb-9">{checkInSuccess}</p>
                                }
                                {
                                    isCheckInDisabled && <button disabled className="flex mx-auto text-white disabled:bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg" onClick={handleCheckIn}>Check-in</button>
                                }
                                {
                                    !isCheckInDisabled && <button className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg" onClick={handleCheckIn}>Check-in</button>
                                }
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