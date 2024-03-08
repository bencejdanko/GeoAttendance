import React from "react";
import deleteIcon from "../../icons/delete.png";
import pictureIcon from "../../icons/picture.png";
import { Link } from 'react-router-dom';

const Event = (props) => {
    // const events = props.events;
    const event = props.events[props.index];

    const handleUploadFileClick = () => {

    }

    return (
        <tr>
            <td class="px-4 py-3 text-xl text-blue-600 underline cursor-pointer"><Link to={'/events/' + event.id} state={props}>{event.name}</Link></td>
            <td class="px-4 py-3 text-xl">{event.code}</td>
            <td class="px-4 py-3 text-xl">{event.capacity}</td>
            <td class="px-4 py-3">
                <button onClick={handleUploadFileClick}>
                    <img className="object-cover object-center rounded" src={pictureIcon} alt="pictureIcon" width={30} />
                </button>
            </td>
            <td class="px-4 py-3">
                <button onClick={handleUploadFileClick}>
                    <img className="object-cover object-center rounded" src={deleteIcon} alt="deleteIcon" width={30} />
                </button>
            </td>
        </tr>
    );
}

export default Event;