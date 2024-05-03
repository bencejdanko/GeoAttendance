import React from "react"

const NoAccess = () => {
    return (
        <section className="text-gray-400 bg-gray-900 body-font relative flex-grow">
            <div className="flex flex-col justify-center items-center h-full">
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-white">Sorry, you don't have access to this page</h1>
            </div>
        </section>
    )
};

export default NoAccess;
