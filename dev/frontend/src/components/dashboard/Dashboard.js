import React, { useEffect, useState } from "react";
import deleteIcon from "../../icons/delete.png"
import pictureIcon from "../../icons/picture.png"
import searchIcon from "../../icons/search.png"
import {
    setDefaults,
    geocode,
    RequestType,
} from "react-geocode";

const Dashboard = (props) => {
    const API_KEY = process.env.REACT_APP_GEOCODER_API_KEY;
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [startTime, setStartTime] = useState(props.formattedDate);
    const [endTime, setEndTime] = useState(props.formattedDate);
    const [eventLocation, setEventLocation] = useState("");
    const [eventLocationError, setEventLocationError] = useState("");

    useEffect = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
            },
            error => console.log(error)
        );
    }

    const handleEventLocationClick = () => {
        setEventLocationError("")
        // Set default response language and region.
        // This sets default values for language and region for geocoding requests.
        setDefaults({
            key: API_KEY, // Your API key here.
            language: "en", // Default language for responses.
            region: "es", // Default region for responses.
        });

        geocode(RequestType.ADDRESS, eventLocation)
            .then(({ results }) => {
                const { lat, lng } = results[0].geometry.location;
                console.log(lat, lng);
                setLat(lat);
                setLng(lng);
            })
            .catch((error) => {
                console.log(error);
                setEventLocationError(error);
            });

    }
    const handleLocationClick = () => {
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

    const handleEventLocationChange = (event) => {
        setEventLocation(event.target.value);
    }

    const handleStartTimeChange = (event) => {
        setStartTime(event.target.value);
    }

    const handleEndTimeChange = (event) => {
        setEndTime(event.target.value);
    }

    const handleSettingsClick = () => {

    }

    const errorCallback = () => {
        console.log("Cannot retrieve the current location")
    }

    const successCallback = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        console.log(`Latitude: ${latitude}, longitude: ${longitude}`)
    }

    return (
        <section className="text-gray-400 bg-gray-900 body-font relative flex-grow">
            <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
                <div className="lg:w-2/3 md:w-1/2 bg-gray-900 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
                    <iframe width="100%" height="100%" title="map" className="absolute inset-0" frameborder="0" marginheight="0" marginwidth="0" scrolling="no" allow="geolocation" src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`} style={{ filter: '' }}></iframe>
                </div>
                <div className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
                    <h2 className="text-white text-2xl mb-1 font-medium title-font">Create New Event</h2>
                    <p className="leading-relaxed mb-5 text-lg text-blue-600"><button onClick={handleLocationClick}>Get Current Location</button></p>
                    <div className="relative mb-4">
                        <label for="code" className="leading-7 text-lg text-gray-400">Event name</label>
                        <input type="code" id="code" name="code" className="w-full bg-gray-800 rounded border border-gray-700 mt-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative mb-4">
                        <label for="code" className="leading-7 text-lg text-gray-400">Event location</label>
                        <div className="relative mb-4 flex items-center">
                            <input type="code" id="code" name="code" className="w-5/6 bg-gray-800 rounded border border-gray-700 mt-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={handleEventLocationChange} />
                            <span className="mt-4 mx-auto">
                                <button onClick={handleEventLocationClick}>
                                    <img className="object-cover object-center rounded" src={searchIcon} alt="searchIcon" width={30} />
                                </button>
                            </span>
                        </div>
                        {eventLocationError !== "" && (
                            <p className="text-xs text-red-600 text-opacity-90 mt-3">Could not find the location based on the provided address.</p>
                        )}

                    </div>
                    <div className="relative mb-4">
                        <label for="event-code" className="leading-7 text-lg text-gray-400">Event code</label>
                        <input type="event-code" id="event-code" name="event-code" className="w-full bg-gray-800 rounded border mt-4 border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative mb-4">
                        <label for="capacity" className="leading-7 text-lg text-gray-400">Capacity</label>
                        <input type="number" id="capacity" name="capacity" className="w-full bg-gray-800 rounded border mt-4 border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative mb-4">
                        <label for="radius" className="leading-7 text-lg text-gray-400">Radius</label>
                        <input type="radius" id="radius" name="radius" className="w-full bg-gray-800 rounded border mt-4 border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative mb-4">
                        <label for="message" className="leading-7 text-lg text-gray-400">Check-in Time</label>
                        <input
                            id="start-time"
                            type="datetime-local"
                            name="datetime-picker"
                            className="w-full bg-gray-800 rounded border mt-4 border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            value={startTime}
                            onChange={handleStartTimeChange} />
                        <input
                            id="end-time"
                            type="datetime-local"
                            name="datetime-picker"
                            className="w-full bg-gray-800 rounded border mt-4 border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            value={endTime}
                            onChange={handleEndTimeChange} />
                    </div>
                    <button className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">Save</button>
                    {/* <p className="text-xs text-gray-400 text-opacity-90 mt-3">Chicharrones blog helvetica normcore iceland tousled brook viral artisan.</p> */}
                </div>
            </div>
            <div class="lg:w-5/6 w-full mx-auto overflow-auto">
                <table class="table-auto w-full text-left whitespace-no-wrap">
                    <thead>
                        <tr>
                            <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-xl bg-gray-800 rounded-tl rounded-bl">Event Name</th>
                            <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-xl bg-gray-800">Event Code</th>
                            <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-xl bg-gray-800">Event Capacity</th>
                            <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-xl bg-gray-800">Upload Picture</th>
                            <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-xl bg-gray-800">Delete Event</th>
                            {/* <th class="w-10 title-font tracking-wider font-medium text-white text-sm bg-gray-800 rounded-tr rounded-br"></th> */}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="px-4 py-3 text-xl text-blue-600 underline cursor-pointer"><a>Name</a></td>
                            <td class="px-4 py-3 text-xl">5 Mb/s</td>
                            <td class="px-4 py-3 text-xl">15 GB</td>
                            <td class="px-4 py-3">
                                <button onClick={handleSettingsClick}>
                                    <img className="object-cover object-center rounded" src={pictureIcon} alt="pictureIcon" width={30} />
                                </button>
                            </td>
                            <td class="px-4 py-3">
                                <button onClick={handleSettingsClick}>
                                    <img className="object-cover object-center rounded" src={deleteIcon} alt="deleteIcon" width={30} />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Dashboard;