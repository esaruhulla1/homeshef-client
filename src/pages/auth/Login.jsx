import React, { useState } from "react";
import { Link, useNavigate, } from "react-router";
import { FaGoogle, FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";



export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
        <button onClick={() => navigate("/")} className="absolute top-4 left-4 flex items-center space-x-2 bg-red-600/60 text-white px-3 py-2 rounded-md">
          <span className="text-xl">←</span>
          <span>Back To Home</span>
        </button>
      </div>

      {/* RIGHT LOGIN SECTION */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-6">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold mb-6">Login</h1>

          {/* Social Login Buttons */}
          <div className="flex flex-col  lg:flex-row items-center gap-4 mb-6">
            <button className="w-full lg:w-1/2 border border-[#fadada] rounded-md py-2 flex items-center justify-center gap-2 text-gray-700">
              <FcGoogle className="text-xl " ></FcGoogle>
              <span>Sign in with Google</span>
            </button>

            <button className="w-full lg:w-1/2 border border-[#fadada] rounded-md py-2 flex items-center justify-center gap-2 text-gray-700">
              {/* <FaFacebookF className="text-xl text-[#0866ff]" /> */}
              <BsFacebook className="text-xl text-[#0866ff]" />
              <span>Sign in with Facebook</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-1 border-t"></div>
            <span className="px-3 text-gray-500">Or Use Your Email</span>
            <div className="flex-1 border-t"></div>
          </div>

          {/* Form */}
          <form>
            <div className="mb-4">
              <label className="text-gray-600">Email Address</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full mt-1 p-3 border border-[#fadada] focus:border-[#f39993] rounded-md bg-red-50 outline-none"
              />
            </div>

            <div className="mb-2">
              <label className="text-gray-600">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  className="w-full mt-1 p-3 border border-[#fadada] focus:border-[#f39993] rounded-md bg-red-50 outline-none"
                />

                {/* Password Toggle */}
                <span
                  className="absolute right-3 top-4 cursor-pointer text-gray-500 text-xl"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* Keep logged in + forgot password */}
            <div className="flex justify-between items-center mb-6">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-red-500" />
                Keep me logged in
              </label>

              <button className="text-sm text-gray-600 hover:underline">
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-md text-lg hover:bg-red-600"
            >
              Log In
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-center mt-6 text-gray-700">
            Don’t Have An Account?{" "}
            <Link to="/register" className="text-red-500 font-semibold">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
