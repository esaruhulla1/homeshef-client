import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaGlobe } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 text-center md:text-left">
                {/* Contact Details */}
                <div>
                    <h2 className="text-lg font-semibold text-white mb-3">Contact</h2>
                    <p>Email: support@example.com</p>
                    <p>Phone: +880 1234 567 890</p>
                    <p>Address: Dhaka, Bangladesh</p>
                </div>

                {/* Social Media Links */}
                <div>
                    <h2 className="text-lg font-semibold text-white mb-3">Follow Us</h2>
                    <div className="flex justify-center md:justify-start space-x-4 text-xl">
                        <a href="#" className="hover:text-white"><FaGlobe /></a>
                        <a href="#" className="hover:text-white"><FaFacebookF /></a>
                        <a href="#" className="hover:text-white"><FaInstagram /></a>
                        <a href="#" className="hover:text-white"><FaYoutube /></a>
                    </div>
                </div>

                {/* Working Hours */}
                <div>
                    <h2 className="text-lg font-semibold text-white mb-3">Working Hours</h2>
                    <p>Sat – Thu: 9:00 AM – 8:00 PM</p>
                    <p>Friday: Closed</p>
                </div>

                {/* Newsletter */}
                <div className=" ">
                    <h2 className="text-lg font-semibold text-white mb-3">Newsletter</h2>
                    <p className="mb-3">Subscribe to get updates.</p>
                    <div className="flex flex-col sm:flex-row items-center sm:items-stretch">
                        <input
                            type="email"
                            className="flex-1 px-3 py-2 rounded-l sm:rounded-l bg-gray-800 border border-gray-700 focus:outline-none mb-2 sm:mb-0"
                            placeholder="Enter your email"
                        />
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-500">
                            Send
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-10 border-t border-gray-700 pt-5 text-center text-gray-500 text-sm">
                © 2025 HomeShef — All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
