import React, { useState } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import query from "../../lib/query.js";
import NoAccess from "../noaccess/NoAccess";

const Checkin = () => {
    const [eventCode, setEventCode] = useState("");
    const [checkoutCode, setCheckoutCode] = useState("")
    const [checkInError, setCheckInError] = useState("");
    const [checkInSuccess, setCheckInSuccess] = useState("");
    const [isCheckInDisabled, setIsCheckInDisabled] = useState(true);
    const [currentGeo, setCurrentGeo] = useState({
        lat: "",
        lng: ""
    });
    const user = JSON.parse(localStorage.getItem("pocketbase_auth")).model

    const reset = () => {
        setEventCode("");
        setCheckoutCode("");
        setCheckInError("");
        setCheckInSuccess("");
    }

    const handleCheckIn = async () => {
        reset()
        if (eventCode !== "" && checkoutCode !== "") {
            setCheckInError("Please enter only one code at a time.");
            return;
        }

        // check if we able to get the current location of the user
        if (currentGeo) {

            if (eventCode !== "") {
                let data = {
                    code: eventCode,
                    latitude: currentGeo.lat,
                    longitude: currentGeo.lng,
                }
                const checkInData = await query.checkin(data);
                if (checkInData instanceof Error) {
                    setCheckInError(checkInData.message);
                } else {
                    await query.saveCheckinTime(checkInData, user.id, new Date().toISOString());
                    setCheckInSuccess("Successfully checked-in.");
                }
            }

            if (checkoutCode !== "") {
                let data = {
                    code: checkoutCode,
                    latitude: currentGeo.lat,
                    longitude: currentGeo.lng,
                }
                const checkOutData = await query.checkout(data);
                if (checkOutData instanceof Error) {
                    setCheckInError(checkOutData.message);
                } else {
                    await query.saveCheckoutTime(checkOutData, user.id, new Date().toISOString());
                    setCheckInSuccess("Successfully checked-out.");
                }
            }

        } else {
            setCheckInError("Please update your location to check-in/check-out.");
        }
    }

    const handleGetCurrentLocation = () => {
        const options = {
            enableHighAccuracy: true,
            // timeout: 5000,
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
        setCurrentGeo({ lat: position.coords.latitude, lng: position.coords.longitude });
        setIsCheckInDisabled(false);
        console.log(`Latitude: ${latitude}, longitude: ${longitude}`)
    }

    return (
        <div className="flex flex-col h-screen">
            <Header />
            {
                user && user.subscription === 0 && (
                    <section className="text-gray-400 bg-gray-900 body-font relative flex-grow">
                        <div className="px-5 py-10 mx-auto">
                            <div className="flex flex-col text-center w-full mb-6">
                                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-5 text-white tracking-widest">Check-in</h1>
                                <p className="leading-relaxed text-lg text-blue-500"><button onClick={handleGetCurrentLocation}>Get current location</button></p>
                            </div>
                            <div className="lg:w-full md:w-1/2 bg-gray-900 rounded-lg overflow-hidden sm:mr-10 p-10 flex relative" style={{ height: "400px" }}>
                                <iframe width="100%" height="100%" title="map" className="absolute inset-0" frameborder="0" marginheight="0" marginwidth="0" scrolling="no" allow="geolocation" src={`https://maps.google.com/maps?q=${currentGeo.lat},${currentGeo.lng}&z=15&output=embed`} style={{ filter: '' }}></iframe>
                            </div>

                            <div className="lg:w-1/2 md:w-2/3 mx-auto">
                                <div className="flex flex-wrap -m-2">
                                    <div className="px-10 w-full">
                                        <p className="lg:w-full mt-10 leading-relaxed text-lg text-center">Enter the event code to check in or check out.</p>

                                        <div className="relative flex">
                                            <input
                                                type="text"
                                                id="eventcode"
                                                placeholder="Check-in Code"
                                                name="eventcode"
                                                className="mt-5 w-full mr-10 bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                value={eventCode}
                                                onChange={(e) => setEventCode(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                id="checkout_code"
                                                placeholder="Check-out Code"
                                                name="checkout_code"
                                                className="mt-5 w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                value={checkoutCode}
                                                onChange={(e) => setCheckoutCode(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="p-2 w-full">
                                        {
                                            !checkInSuccess && <p className="text-red-600 text-center mb-9">{checkInError}</p>
                                        }
                                        {
                                            checkInSuccess && <p className="text-red-600 text-center mb-9">{checkInSuccess}</p>
                                        }
                                        {
                                            isCheckInDisabled && <button disabled className="flex mx-auto text-white disabled:bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg" onClick={handleCheckIn}>Submit</button>
                                        }
                                        {
                                            !isCheckInDisabled && <button className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg" onClick={handleCheckIn}>Submit</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }
            {
                !(user && user.subscription === 0) && (
                    <NoAccess/>
                )
            }
            <Footer />
        </div>
    );
}

export default Checkin;