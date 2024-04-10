import {React, useEffect, useState} from "react";
import deleteIcon from "../../icons/delete.png";
import pictureIcon from "../../icons/picture.png";
import { Link } from 'react-router-dom';
import query from "../../lib/query";

const Event = (props) => {
    // const events = props.events;
    const event = props.events[props.index];

    const handleUploadFileClick = () => {

    }

    const [groupName, setGroupName] = useState("");

    useEffect(() => {
        async function fetchGroupName() {
            if(event.group_id) {
                const name = await query.getGroupName(event.group_id);
                setGroupName(name);
            }
        }

        fetchGroupName();     

    }, [groupName])

    return (
        <tr>
            <td className="px-4 py-3 text-xl text-blue-600 underline cursor-pointer"><Link to={'/events/' + event.id} state={props}>{event.name}</Link></td>
            <td className="px-4 py-3 text-xl">{event.code}</td>
            <td className="px-4 py-3 text-xl">{event.capacity}</td>
            {/* <td className="px-4 py-3">
                <button onClick={handleUploadFileClick}>
                    <img className="object-cover object-center rounded" src={pictureIcon} alt="pictureIcon" width={30} />
                </button>
            </td> */}
            {
                event.group_id && (<td className="px-4 py-3 text-xl">{ groupName }</td>)
            }
            {
                !event.group_id && (<td className="px-4 py-3 text-xl">N/A</td>)
            }
            <td className="px-4 py-3">
                <button onClick={handleUploadFileClick}>
                    <img className="object-cover object-center rounded" src={deleteIcon} alt="deleteIcon" width={30} />
                </button>
            </td>
        </tr>
    );
}

export default Event;