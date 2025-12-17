import React from "react";
import { Link } from "react-router";

const Error = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="text-center max-w-md">
                <h1 className="text-7xl font-bold text-red-500 mb-4">404</h1>

                <h2 className="text-2xl font-semibold mb-2">
                    Page Not Found
                </h2>

                <p className="text-gray-600 mb-6">
                    Sorry, the page you are looking for doesn’t exist or has been moved.
                </p>

                <Link
                    to="/"
                    className="inline-block px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default Error;
