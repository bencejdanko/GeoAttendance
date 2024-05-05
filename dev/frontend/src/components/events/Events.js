import React from "react"
import Footer from "../footer/Footer";
import Header from "../header/Header";
import NoAccess from "../noaccess/NoAccess";

const Events = () => {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <NoAccess title="Dispage is being developed. Please come back later!"/>
            <Footer/>
        </div>
    )
};

export default Events;
