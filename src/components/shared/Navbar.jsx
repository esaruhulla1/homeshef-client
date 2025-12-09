import React, { useContext } from 'react';
import { FaArrowRight, FaSignOutAlt } from 'react-icons/fa';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';

const Navbar = () => {
    const { user, singOutUser, loading } = useContext(AuthContext);

    const linkClass =
        "hover:bg-transparent hover:underline hover:underline-offset-3 hover:decoration-red-400 focus:bg-transparent active:text-red-600";

    const links = (
        <>
            <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
            <li><NavLink to="/meals" className={linkClass}>Meals</NavLink></li>

            {/* 🔥 Dashboard only if user logged in */}
            {user && (
                <li><NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink></li>
            )}
        </>
    );

    return (
        <nav className="bg-base-100 shadow-sm">
            <div className="container mx-auto navbar">
                {/* LEFT */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>

                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >
                            {links}
                        </ul>
                    </div>

                    <a className="text-3xl font-bold tracking-tight cursor-pointer">
                        <span>Home</span>
                        <span className="text-red-500">Shef</span>
                    </a>
                </div>

                {/* CENTER */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{links}</ul>
                </div>

                {/* RIGHT */}
                <div className="navbar-end flex items-center gap-3">

                    {/* 🔥 If NOT Logged In → Show Login Button */}
                    {!user && !loading && (
                        <Link
                            to="/login"
                            className="flex items-center gap-2 bg-red-500 text-white px-6 py-2.5 rounded-full font-medium 
                                       transition-all duration-300 shadow-lg shadow-red-200 dark:shadow-none group"
                        >
                            <span>Sign In</span>
                            <FaArrowRight />
                        </Link>
                    )}

                    {/* 🔥 If Logged In → Show Photo + Logout Button */}
                    {user && (
                        <div className="flex items-center gap-3">
                            {/* User Photo */}
                            <img
                                src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                alt="profile"
                                className="w-10 h-10 rounded-full border"
                            />

                            {/* Logout Button */}
                            <button
                                onClick={singOutUser}
                                className="flex items-center gap-2 border border-red-400 text-red-500 
                                           px-4 py-2.5 rounded-full font-medium transition-all duration-300"
                            >
                                Logout <FaSignOutAlt />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
