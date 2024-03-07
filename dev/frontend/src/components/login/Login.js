import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        const data = await response.json()

        if (response.ok) {
            localStorage.setItem("email", email);
            navigate('/profile', { state: { email: email } });
        } else if (data.error) {
            setError(data.error)
        } else {
            setError("An unrecoverable error occured")
        }

    }

    return (
        <section className="text-gray-400 bg-gray-900 body-font relative py-48 flex-grow">
            <div className="px-5 mx-auto">
                <div className="flex flex-col text-center w-full">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Sign in</h1>
                    <p className="lg:w-2/3 mx-auto pb-2 leading-relaxed text-lg">Need an account? <a class="underline" href='/signup'>Register</a></p>
                </div>
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label for="email" className="leading-7 text-xl text-gray-400">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-5 w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="p-2 mt-5 w-full">
                            {error && <p className="text-red-600 text-center mb-5">{error}</p>}

                            <button
                                className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                                onClick={handleSubmit}
                            >
                                Sign in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;