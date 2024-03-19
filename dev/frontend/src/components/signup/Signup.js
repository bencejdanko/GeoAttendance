import React, {  } from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider';

import { useForm } from 'react-hook-form';


const Signup = () => {

    const { signup, authSignupError, authSignupSuccess } = useAuth();
    const { register, handleSubmit } = useForm();

    return (
        <div className="flex flex-col h-screen">
            <Header/>
            <section className="text-gray-400 bg-gray-900 body-font relative py-10 flex-grow">
                <div className="px-5 mx-auto">
                    <div className="flex flex-col text-center w-full">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Sign-up to create an account</h1>
                        <p className="lg:w-2/3 mx-auto pb-2 leading-relaxed text-lg">Already have an account? <Link className="underline" to='/login'>Login</Link></p>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <form 
                        onSubmit={ handleSubmit(signup) }
                        className="flex flex-wrap -m-2">
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label for="first_name" className="leading-7 text-md text-gray-400">First Name</label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        className="mt-3 w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        {...register("first_name", { required: true })}
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label for="last_name" className="leading-7 text-md text-gray-400">Last Name</label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        className="mt-3 w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        {...register("last_name", { required: true })}
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label for="username" className="leading-7 text-md text-gray-400">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        className="mt-3 w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        {...register("username", { required: true })}
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label for="email" className="leading-7 text-md text-gray-400">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="mt-3 w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        {...register("email", { required: true })}
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label for="password" className="leading-7 text-md text-gray-400">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="mt-3 w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        {...register("password", { required: true })}
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label for="passwordConfirm" className="leading-7 text-md text-gray-400">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="passwordConfirm"
                                        name="passwordConfirm"
                                        className="mt-3 w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        {...register("passwordConfirm", { 
                                            required: true,
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mt-4">
                                <input
                                    id="subscription"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    {...register("subscription")} />
                                <label for="subscription" className="ml-2 leading-7 text-md text-gray-400">Register as a host</label>
                            </div>
                            <div className="p-2 mt-5 w-full">
                                {authSignupError && <p className="text-red-600 text-center mb-5">{authSignupError}</p>}

                                <input
                                    className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                                    type="submit"
                                    value="Register"
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

export default Signup;