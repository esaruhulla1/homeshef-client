import React from 'react';
import { Link } from 'react-router';

const Forbidden = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-4 text-center">

            <h1 className="text-7xl font-extrabold text-error mb-4 text-red-500">
                403
            </h1>

            <h2 className="text-2xl font-bold mb-2">
                Access Forbidden
            </h2>

            <p className="text-gray-500 max-w-md mb-6">
                Sorry, you don’t have permission to access this page.
                Please contact the administrator or go back to the homepage.
            </p>

            <Link to="/" className="btn btn-error  bg-black text-white">
                Go to Home
            </Link>

        </div>
    );
};

export default Forbidden;
