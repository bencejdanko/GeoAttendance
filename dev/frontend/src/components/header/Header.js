import React from "react";
import logo from '../../../src/geo-fence.svg'

const Header = () => {

    return (
        <header className="text-gray-400 bg-gray-900 body-font">
            <div className="px-8 py-10 flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="mx-auto flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <img src={logo} width="75" height="75" alt="logo"/>
                    <span className="ml-3 text-3xl">GeoAttendance</span>
                </a>
                <nav className="mx-auto md:ml-auto flex flex-wrap items-center text-base justify-end">
                    <a className="mr-10 hover:text-white text-2xl">Home</a>
                    <a className="mr-10 hover:text-white text-2xl">Profile</a>
                    <a className="mr-10 hover:text-white text-2xl">Register</a>
                    <a className="mr-10 hover:text-white text-2xl">Log In</a>
                    <a className="mr-10 hover:text-white text-2xl">About Us</a>
                    <a className="mr-10 hover:text-white text-2xl">Contact Us</a>
                </nav>
            </div>
        </header>
    )
}

export default Header;