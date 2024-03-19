import React, { useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import { BrowserRouter, Link } from 'react-router-dom'

import { useForm } from "react-hook-form";

const Login = () => {
    const {authLoginError, authLoginSuccess, login, setAuthLoginError} = useAuth();
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        return () => {
          setAuthLoginError(null);
        };
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <Header/>
            <section className="text-gray-400 bg-gray-900 body-font relative py-10 flex-grow">
                <div className="px-5 mx-auto">
                    <div className="flex flex-col text-center w-full">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Sign in</h1>
                        <p className="lg:w-2/3 mx-auto pb-2 leading-relaxed text-lg">Need an account? <Link className="underline" to='/signup'>Register</Link></p>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <form 
                            onSubmit={ handleSubmit(login) }
                            className="flex flex-wrap -m-2">
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label for="email" className="leading-7 text-xl text-gray-400">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="mt-5 w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        {...register("email", { required: true })}
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label for="password" className="leading-7 text-xl text-gray-400">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="mt-5 w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        {...register("password", { required: true })}
                                    />
                                </div>
                            </div>
                            <div className="p-2 mt-5 w-full">
                                {authLoginError && <p className="text-red-600 text-center mb-5">{authLoginError}</p>}

                                <input 
                                className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                                type="submit" 
                                value="Submit" 
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </div>

    )
}

export default Login;