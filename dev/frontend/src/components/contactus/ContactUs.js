import React, { useEffect, useState } from "react";
import Footer from '../footer/Footer';
import Header from '../header/Header';
import query from '../../lib/query';

const ContactUs = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')

    const handleSaveFeedback = async () => {
        let response = await query.submitFeedback({ name, email, message })

        if (response instanceof Error) {
            console.log('Error', response)
            setStatus(response.message)
            return
        }

        setStatus('Feedback submitted successfully')
    }

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <section className="text-gray-400 bg-gray-900 body-font relative flex-grow">
                <div className="px-5 py-10 mx-auto">
                    <div className="flex flex-col text-center w-full mb-8">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white tracking-widest">Contact Us</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-lg">Please fill out the form below, and our team will get back to you as soon as possible.</p>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label for="name" className="leading-7 text-md text-gray-400">Name</label>
                                    <input 
                                    value = {name}
                                    onChange = {(e) => setName(e.target.value)}
                                    type="text" id="name" name="name" className="mt-5 w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label for="email" className="leading-7 text-md text-gray-400">Email</label>
                                    <input 
                                    value = {email}
                                    onChange = {(e) => setEmail(e.target.value)}
                                    type="email" id="email" name="email" className="mt-5 w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label for="message" className="leading-7 text-md text-gray-400">Message</label>
                                    <textarea 
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    id="message" name="message" className="mt-5 w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </div>
                            </div>
                            <div className="p-2 mt-5 w-full">
                                <button 
                                onClick={handleSaveFeedback}
                                className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">Send message</button>
                                 {status && <p className="text-center text-white mt-5">{status}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>

    )
}

export default ContactUs;