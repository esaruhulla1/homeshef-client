import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { singInUser, loading } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState("");

    // ⬇️ LOGIN SUBMIT
    const onSubmit = async (data) => {
        const { email, password } = data;
        setLoginError("");

        try {
            const result = await singInUser(email, password);
            console.log("Login Success:", result.user);

            reset();
            navigate("/");
        } catch (err) {
            console.error(err);
            setLoginError("Invalid email or password!");
        }
    };

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
                <button
                    onClick={() => navigate("/")}
                    className="absolute top-4 left-4 flex items-center space-x-2 bg-red-600/60 text-white px-3 py-2 rounded-md"
                >
                    <span className="text-xl">←</span>
                    <span>Back To Home</span>
                </button>
            </div>

            {/* RIGHT LOGIN SECTION */}
            <div className="w-full md:w-1/2 flex justify-center items-center px-6">
                <div className="w-full max-w-md">
                    <h1 className="text-4xl font-bold mb-6">Login</h1>

                    {/* Social Login */}
                    <div className="flex flex-col lg:flex-row items-center gap-4 mb-6">
                        <button className="w-full lg:w-1/2 border border-[#fadada] rounded-md py-2 flex items-center justify-center gap-2 text-gray-700">
                            <FcGoogle className="text-xl" />
                            <span>Sign in with Google</span>
                        </button>

                        <button className="w-full lg:w-1/2 border border-[#fadada] rounded-md py-2 flex items-center justify-center gap-2 text-gray-700">
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

                    {/* ⚡ LOGIN FORM WITH HOOK FORM */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Email */}
                        <div className="mb-4">
                            <label className="text-gray-600">Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                {...register("email", { required: "Email is required" })}
                                className="w-full mt-1 p-3 border border-[#fadada] focus:border-[#f39993] rounded-md bg-red-50 outline-none"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="mb-2">
                            <label className="text-gray-600">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Your Password"
                                    {...register("password", {
                                        required: "Password is required"
                                    })}
                                    className="w-full mt-1 p-3 border border-[#fadada] focus:border-[#f39993] rounded-md bg-red-50 outline-none"
                                />

                                {/* Toggle */}
                                <span
                                    className="absolute right-3 top-4 cursor-pointer text-gray-500 text-xl"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Login Error */}
                        {loginError && (
                            <p className="text-red-600 text-sm mb-3">{loginError}</p>
                        )}

                        {/* Options */}
                        <div className="flex justify-between items-center mb-6">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="accent-red-500" />
                                Keep me logged in
                            </label>

                            <button
                                type="button"
                                className="text-sm text-gray-600 hover:underline"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-red-500 text-white py-3 rounded-md text-lg 
                                ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"}
                            `}
                        >
                            {loading ? "Logging in..." : "Log In"}
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
