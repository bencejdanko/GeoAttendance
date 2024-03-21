import React, { useEffect, useState } from "react";
import searchIcon from "../../icons/search.png"
import {
    setDefaults,
    geocode,
    RequestType,
} from "react-geocode";
import Event from "../event/Event";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useAuth } from "../auth/AuthProvider";
import pb from "../../lib/pocketbase";

const Dashboard = (props) => {
    const API_KEY = process.env.REACT_APP_GEOCODER_API_KEY;
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [startTime, setStartTime] = useState(props.formattedDate);
    const [endTime, setEndTime] = useState(props.formattedDate);
    const [eventCode, setEventCode] = useState("");
    const [capacity, setCapacity] = useState("");
    const [radius, setRadius] = useState("");
    const [groupCode, setGroupCode] = useState("");
    const [eventName, setEventName] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [eventLocationError, setEventLocationError] = useState("");
    const [groupName, setGroupName] = useState("");
    const [events, setEvent] = useState([]);
    const [groupOptionSelected, setGroupOptionSelected] = useState("");
    const [isCreateNewGroup, setIsCreateNewGroup] = useState(false);
    const [error, setError] = useState("");
    const [groupOptions, setGroupOptions] = useState(["None", "Add New Group"]);
    const { user } = useAuth();


    useEffect = () => {

        navigator.geolocation.getCurrentPosition(
            position => {
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
            },
            error => console.log(error)
        );
    }

    const handleSaveEvent = async () => {

        let start = new Date(startTime);
        let end = new Date(endTime);

        // get event detail
        let data = {
            name: eventName,
            host: pb.authStore.model.id, //Current user ID
            capacity: capacity,
            code: eventCode,
            longitude: lng,
            latitude: lat,
            radius: radius,
            start_time: start.toISOString(),
            end_time: end.toISOString(),
            registed_attendees: [],
            checked_in_attendees: [],
        }

        try {
            const response = await pb.collection('events').create(data);
            console.log("Event created: " + response.id);
            setEvent([...events, response]);

            if (groupOptionSelected === "new_group") {
                let group_data = {
                    host: pb.authStore.model.id, //Current user ID
                    name: groupName,
                    code: groupCode,
                    event_id: response.id,
                }
                
    
                try {
                    const group = await pb.collection('groups').create(group_data);
                    console.log("Group created: " + group.id);

                    try {
                        const event = await pb.collection('events').update(response.id, {group_id: group.id});
                        console.log("Group created: " + group.id);
                    } catch (e) {
                        console.log(e);
                        setError("Could not update the event with group");
                    }

                } catch (e) {
                    console.log(e);
                    setError("Could not create the group");
                }

            }

        } catch (e) {
            console.log(e);
            setError("Could not create the event");
        }

    }

    const handleOptionChange = (e) => {
        if (e.target.value === "new_group") {
            setIsCreateNewGroup(true);
        } else {
            setIsCreateNewGroup(false);
        }
        setGroupOptionSelected(e.target.value);
    }


    const handleEventLocationClick = () => {
        setEventLocationError("");
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
    
    const refreshEvents = async () => {
        try {
            const events = await pb.collection('events').getFullList()
            setEvent(events);
        } catch (e) {
            setEvent([]);
        }
    }

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <section className="text-gray-400 bg-gray-900 body-font relative flex-grow">
                <div className="container px-5 py-10 mx-auto flex sm:flex-nowrap flex-wrap">
                    <div className="lg:w-2/3 md:w-1/2 bg-gray-900 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
                        <iframe width="100%" height="100%" title="map" className="absolute inset-0" frameborder="0" marginheight="0" marginwidth="0" scrolling="no" allow="geolocation" src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`} style={{ filter: '' }}></iframe>
                    </div>
                    <div className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
                        <h2 className="text-white text-2xl mb-8 font-medium title-font">Create New Event</h2>
                        <div className="relative mb-4">
                            <label for="code" className="leading-7 text-lg text-gray-400">Event name</label>
                            <input 
                                value = {eventName}
                                onChange = {(e) => setEventName(e.target.value)}
                                type="text"
                                id="event-name"
                                name="event-name"
                                className="w-full bg-gray-800 rounded border border-gray-700 mt-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
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
                            <p className="leading-relaxed text-lg text-blue-600"><button onClick={handleLocationClick}>Or get current location</button></p>

                            {eventLocationError !== "" && (
                                <p className="text-xs text-red-600 text-opacity-90 mt-3">Could not find the location based on the provided address.</p>
                            )}

                        </div>
                        <div className="relative mb-4">
                            <label for="event-code" className="leading-7 text-lg text-gray-400">Event code</label>
                            <input 
                            value={eventCode}
                            onChange={(e) => setEventCode(e.target.value)}
                            type="text" 
                            id="event-code" 
                            name="event-code" 
                            className="w-full bg-gray-800 rounded border mt-4 border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        {/* <div class="flex ml-6 items-center"> */}
                        <div className="relative mb-4">Group</div>
                        <select value={groupOptionSelected} onChange={handleOptionChange} className="w-full bg-gray-800 rounded border mb-4 border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-3 px-3 leading-8 transition-colors duration-200 ease-in-out">
                            <option value="none">None</option>
                            <option value="new_group">Add new group</option>
                        </select>
                        {isCreateNewGroup &&
                            <div className="relative mb-4">
                                <label for="new_group_name" className="leading-7 text-lg text-gray-400">New Group Name</label>
                                <input 
                                value = {groupName}
                                onChange = {(e) => setGroupName(e.target.value)}
                                type="text" id="new_group_nam" name="new_group_nam" className="w-full bg-gray-800 rounded border mt-4 border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                
                                <label for="new_group_code" className="leading-7 text-lg text-gray-400">New Group Code</label>
                                <input 
                                value = {groupCode}
                                onChange = {(e) => setGroupCode(e.target.value)}
                                type="text" id="new_group_code" name="new_group_code" className="w-full bg-gray-800 rounded border mt-4 border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                
                            </div>
                        }
                        <div className="relative mb-4">
                            <label for="capacity" className="leading-7 text-lg text-gray-400">Capacity</label>
                            <input 
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            type="number" 
                            id="capacity" 
                            name="capacity" 
                            className="w-full bg-gray-800 rounded border mt-4 border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label for="radius" className="leading-7 text-lg text-gray-400">Radius</label>
                            <input 
                            value={radius}
                            onChange={(e) => setRadius(e.target.value)}
                            
                            type="radius" id="radius" name="radius" className="w-full bg-gray-800 rounded border mt-4 border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
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
                        <button onClick={handleSaveEvent} className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">Save</button>
                        {error && <p className="text-xs text-red-600 text-opacity-90 mt-3">{error}</p>}
                    </div>
                </div>
                <div className="lg:w-5/6 w-full mx-auto overflow-auto">
                    <button 
                    onClick = {refreshEvents}
                    className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">Refresh Events</button>
                    
                    <table className="table-auto w-full text-left whitespace-no-wrap">
                        <thead>
                            <tr>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-xl bg-gray-800 rounded-tl rounded-bl">Event Name</th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-xl bg-gray-800">Event Code</th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-xl bg-gray-800">Event Capacity</th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-xl bg-gray-800">Group Name</th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-xl bg-gray-800">Delete Event</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                events.map((event, idx) => (
                                    <Event events={events} key={event.id} index={idx} />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </section>
            <Footer />
        </div>
        
    )
}

export default Dashboard