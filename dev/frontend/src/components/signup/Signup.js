import React, { useState } from 'react';
import { redirect } from "react-router-dom"

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({ email, password })
        })

        const data = await response.json()

        if (data.token) {
            localStorage.setItem('token', data.token)
            setError("Successful Login!")
            return redirect("/home")
        } else if (data.error) {
            setError(data.error)
        } else {
            setError("An unrecoverable error occured")
        }
        
    }

    return (
        <section className="text-gray-400 bg-gray-900 body-font relative py-12 flex-grow">
            <div className="px-5 mx-auto">
                <div className="flex flex-col text-center w-full">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Sign-up to create an account</h1>
                    <p className="lg:w-2/3 mx-auto pb-2 leading-relaxed text-lg">Already have an account? <a class="underline" href='/login'>Login</a></p>
                </div>
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label for="firstname" className="leading-7 text-md text-gray-400">First Name</label>
                                <input type="text" id="firstname" name="firstname" className="mt-3 w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label for="name" className="leading-7 text-md text-gray-400">Last Name</label>
                                <input type="text" id="name" name="name" className="mt-3 w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label for="name" className="leading-7 text-md text-gray-400">Username</label>
                                <input type="text" id="name" name="name" className="mt-3 w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label for="email" className="leading-7 text-md text-gray-400">Email</label>
                                <input type="email" id="email" name="email" className="mt-3 w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label for="email" className="leading-7 text-md text-gray-400">Password</label>
                                <input type="email" id="email" name="email" className="mt-3 w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label for="email" className="leading-7 text-md text-gray-400">Confirm Password</label>
                                <input type="email" id="email" name="email" className="mt-3 w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                            </div>
                        </div>
                        <div className="p-2 mt-5 w-full">
                            <button className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">Register</button>
                        </div>
                    </div>
                </div>
            </div>
            {error && <div className="error-message">{error}</div>}
        </section>
    )
}

export default Signup;