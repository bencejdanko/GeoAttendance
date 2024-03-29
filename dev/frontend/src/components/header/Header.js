import React from "react";
import logo from '../../../src/icons/logoIcon.svg'
import { useAuth } from "../auth/AuthProvider";
import { Link } from 'react-router-dom'

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="text-gray-400 bg-gray-900 body-font">
            <div className="px-8 py-10 flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link className="mx-auto flex title-font font-medium items-center text-white mb-4 md:mb-0" to="/">
                    <img src={logo} width="75" height="75" alt="logo" />
                    <span className="ml-3 text-xl">GeoAttendance</span>
                </Link>
                {
                    !user && (
                        <nav className="mx-auto md:ml-auto flex flex-wrap items-center text-base justify-end">
                            <Link className="mr-10 hover:text-white text-lg" to="/">Home</Link>
                            <Link className="mr-10 hover:text-white text-lg" to="/aboutus">About Us</Link>
                            <Link className="mr-10 hover:text-white text-lg" to="/contactus">Contact Us</Link>
                            <Link className="mr-10 hover:text-white text-lg" to="/signup">Register</Link>
                            <Link className="mr-10 hover:text-white text-lg" to="/login">Log In</Link>
                        </nav>
                    )
                }
                {
                    user && (
                        <nav className="mx-auto md:ml-auto flex flex-wrap items-center text-base justify-end">
                            <Link className="mr-10 hover:text-white text-lg" to="/">Home</Link>
                            <Link className="mr-10 hover:text-white text-lg" to="/profile">Profile</Link>
                            {
                                user.subscription === 1 && (
                                    <Link className="mr-10 hover:text-white text-lg" to="/dashboard">Dashboard</Link>
                                )
                            }
                            {
                                user.subscription === 0 && (
                                    <Link className="mr-10 hover:text-white text-lg" to="/checkin">Check-in</Link>
                                )
                            }
                            <Link className="mr-10 hover:text-white text-lg" to="/aboutus">About Us</Link>
                            <Link className="mr-10 hover:text-white text-lg" to="/contactus">Contact Us</Link>
                            <Link className="mr-10 hover:text-white text-lg" onClick={() => logout()} to="/">Log Out</Link>
                        </nav>
                    )
                }

            </div>
        </header>
    )
}

export default Header;