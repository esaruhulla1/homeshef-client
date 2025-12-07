import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash, FaFacebookF, FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { FiUpload } from "react-icons/fi";


export default function Register() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="w-full h-screen flex">
            {/* LEFT IMAGE SECTION */}
            <div className="w-1/2 h-full relative hidden md:block">
                <img
                    src="/login-img.jpg"
                    alt="Food Background"
                    className="w-full h-full object-cover"
                />

                {/* Back Button */}
                {/* <button onClick={() => navigate("/")} className="absolute top-4 left-4 flex items-center space-x-2 bg-black/50 text-white px-3 py-2 rounded-md"> */}
                <button onClick={() => navigate("/")} className="absolute top-4 left-4 flex items-center space-x-2 bg-red-600/60 text-white px-3 py-2 rounded-md">
                    <span className="text-xl">←</span>
                    <span>Back To Home</span>
                </button>
            </div>

            {/* RIGHT REGISTER SECTION */}
            <div className="w-full md:w-1/2 flex justify-center items-center px-6 overflow-auto py-10">
                <div className="w-full max-w-md">
                    <h1 className="text-4xl font-bold mb-6">Create Account</h1>

                    {/* Social Login Buttons */}
                    <div className="flex flex-col  lg:flex-row items-center gap-4 mb-4">
                        <button className="w-full lg:w-1/2 border border-[#fadada] rounded-md py-2 flex items-center justify-center gap-2 text-gray-700">
                            <FcGoogle className="text-xl text-[#fa6c62]" ></FcGoogle>
                            <span>Sign in with Google</span>
                        </button>

                        <button className="w-full lg:w-1/2 border border-[#fadada] rounded-md py-2 flex items-center justify-center gap-2 text-gray-700">
                            {/* <FaFacebookF className="text-xl text-[#0866ff]" /> */}
                            <BsFacebook className="text-xl text-[#0866ff]" />

                            <span>Sign in with Facebook</span>
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center mb-4">
                        <div className="flex-1 border-t"></div>
                        <span className="px-3 text-gray-500">Or Use Your Email</span>
                        <div className="flex-1 border-t"></div>
                    </div>

                    {/* Registration Form */}
                    <form>
                        {/* Name */}
                        <div className="mb-2">
                            <label className="text-gray-600">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter Your Name"
                                className="w-full mt-1 p-2 border border-[#fadada] focus:border-[#f39993] rounded-md bg-red-50 outline-none"
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-2">
                            <label className="text-gray-600">Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                className="w-full mt-1 p-2 border  border-[#fadada] focus:border-[#f39993] rounded-md bg-red-50 outline-none"
                            />
                        </div>

                        {/* Profile Image */}
                        {/* <div className="mb-2 relative">
                            <label className="text-gray-600">Profile Image</label>
                            <input

                                type="file"
                                className="w-full mt-1 p-2 border border-[#fadada] focus:border-[#f39993] rounded-md bg-red-50 outline-none"
                            />
                            <FiUpload className="absolute right-3 top-9 text-gray-600 text-xl cursor-pointer" />
                        </div> */}
                        <div className="mb-2">
                            <label className="text-gray-600">Profile Image</label>

                            <label className="w-full mt-1 p-2 border border-[#fadada] focus:border-[#f39993] bg-red-50 rounded-md flex items-center gap-2 cursor-pointer">
                                <FiUpload className=" text-xl ml-2 hover:text-green-500" />
                                <span className="text-gray-500 ml-2">Upload Profile Image</span>

                                <input type="file" className="hidden" />
                            </label>
                        </div>

                        {/* Address */}
                        <div className="mb-2">
                            <label className="text-gray-600">Address</label>
                            <textarea
                                placeholder="Enter Your Address"
                                className="w-full mt-1 p-2 border border-[#fadada] focus:border-[#f39993] rounded-md bg-red-50 outline-none"
                                rows="1"
                            ></textarea>
                        </div>

                        {/* Password */}
                        <div className="mb-2">
                            <label className="text-gray-600">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Password"
                                    className="w-full mt-1 p-2 border border-[#fadada] focus:border-[#f39993] rounded-md bg-red-50 outline-none"
                                />
                                <span
                                    className="absolute right-3 top-4 cursor-pointer text-gray-500 text-xl"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-2">
                            <label className="text-gray-600">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    className="w-full mt-1 p-2 border border-[#fadada] focus:border-[#f39993] rounded-md bg-red-50 outline-none"
                                />
                                <span
                                    className="absolute right-3 top-4 cursor-pointer text-gray-500 text-xl"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>

                        {/* agree Privacy Policy*/}
                        <div>
                            <label className="flex items-center pb-3 gap-2">
                                <input type="checkbox" className="accent-red-500" />
                                I agree to the Terms of Service and Privacy Policy
                            </label>
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            className="w-full bg-red-500 text-white py-3 rounded-md text-lg hover:bg-red-600"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="text-center mt-6 text-gray-700">
                        Already have an account?{" "}
                        <Link to="/login" className="text-red-500 font-semibold">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
