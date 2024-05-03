import { React, useEffect, useState } from "react";
import deleteIcon from "../../icons/delete.png";
import pictureIcon from "../../icons/picture.png";
import { Link } from 'react-router-dom';
import query from "../../lib/query";
import { useAuth } from "../auth/AuthProvider";

const Event = (props) => {
    // const events = props.events;
    const event = props.events[props.index];
    const [events, setEvents] = useState([]);
    // const { user } = useAuth();
    const user = JSON.parse(localStorage.getItem("pocketbase_auth")).model

    useEffect(() => {
        const getEvents = async () => {
            const events = await query.getEvents(user.id);
            props = events;
            setEvents(events);
        }

        getEvents()
    }, [events])

    const handleDeleteEvent = () => {

    }

    return (
        <tr>
            <td className="px-4 py-3 text-xl text-blue-600 underline cursor-pointer"><Link to={'/events/' + event.id} state={props}>{event.name}</Link></td>
            <td className="px-4 py-3 text-xl">{event.checkin_code}</td>
            <td className="px-4 py-3 text-xl">{event.checkout_code}</td>
            <td className="px-4 py-3 text-xl">{event.capacity}</td>
            {/* <td className="px-4 py-3">
                <button onClick={handleUploadFileClick}>
                    <img className="object-cover object-center rounded" src={pictureIcon} alt="pictureIcon" width={30} />
                </button>
            </td> */}
            {
                event.group_id && (<td className="px-4 py-3 text-xl">{event.expand?.group_id?.name ? event.expand.group_id.name : props.name}</td>)
            }
            {
                !event.group_id && (<td className="px-4 py-3 text-xl">N/A</td>)
            }
            <td className="px-4 py-3">
                <button onClick={handleDeleteEvent}>
                    <img className="object-cover object-center rounded" src={deleteIcon} alt="deleteIcon" width={30} />
                </button>
            </td>
        </tr>
    );
}

export default Event;