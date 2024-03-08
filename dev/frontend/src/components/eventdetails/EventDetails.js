import React from "react";
import { useLocation } from 'react-router-dom'

const EventDetails = () => {
    const location = useLocation();
    const {events, index} = location.state;

    return (
        <div className="flex-grow"></div>
    )
}

export default EventDetails;