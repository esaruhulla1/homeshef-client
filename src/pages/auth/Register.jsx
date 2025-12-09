import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function Register() {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { createUser, updateUserProfile } = useContext(AuthContext);

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [uploading, setUploading] = useState(false);

    const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

    const onSubmit = async (data) => {
        const { email, password, name, address, image } = data;

        try {
            // ========== 1) UPLOAD IMAGE TO IMGBB ==========
            let imageUrl = "";
            if (image && image[0]) {
                const formData = new FormData();
                formData.append("image", image[0]);

                setUploading(true);

                const res = await fetch(image_API_URL, {
                    method: "POST",
                    body: formData,
                });

                const imgData = await res.json();
                setUploading(false);

                if (imgData.success) {
                    imageUrl = imgData.data.url;
                } else {
                    alert("Image upload failed!");
                    return;
                }
            }

            // ========== 2) CREATE USER ==========
            const result = await createUser(email, password);

            // create user in the database
            const userInfo = {
                name: name,
                email: email,
                photoURL: imageUrl,
                address: address,
                role: "user",
                status: "active",
                createdAt: new Date()
            }

            axiosSecure.post('/users', userInfo)
                .then(res => {
                    if (res.data.insertedId) {
                        console.log('user created in the database');
                    }
                })

            // ========== 3) UPDATE FIREBASE PROFILE ==========
            await updateUserProfile({
                displayName: name,
                photoURL: imageUrl,
            });

            console.log("User Created:", result.user);
            reset();
            navigate("/");
        } catch (error) {
            console.error("Registration Error:", error);
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
                <button
                    onClick={() => navigate("/")}
                    className="absolute top-4 left-4 flex items-center space-x-2 bg-red-600/60 text-white px-3 py-2 rounded-md"
                >
                    <span className="text-xl">←</span>
                    <span>Back To Home</span>
                </button>
            </div>

            {/* RIGHT REGISTER SECTION */}
            <div className="w-full md:w-1/2 flex justify-center items-center px-6 overflow-auto py-10">
                <div className="w-full max-w-md">
                    <h1 className="text-4xl font-bold mb-6">Create Account</h1>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Name */}
                        <div className="mb-2">
                            <label className="text-gray-600">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter Your Name"
                                {...register("name", { required: "Name is required" })}
                                className="w-full mt-1 p-2 border border-[#fadada] focus:border-[#f39993] rounded-md bg-red-50 outline-none"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        {/* Email */}
                        <div className="mb-2">
                            <label className="text-gray-600">Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                {...register("email", { required: "Email is required" })}
                                className="w-full mt-1 p-2 border border-[#fadada] focus:border-[#f39993] rounded-md bg-red-50 outline-none"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        {/* Profile Image */}
                        <div className="mb-2">
                            <label className="text-gray-600">Profile Image</label>
                            <label className="relative w-full mt-1 p-2 border border-[#fadada] bg-red-50 rounded-md flex items-center gap-2 cursor-pointer">
                                <FiUpload className="text-xl" />
                                <span className="ml-2">{uploading && "Uploading..."}</span>
                                <input type="file" {...register("image")} className="" />
                            </label>
                        </div>

                        {/* Address */}
                        <div className="mb-2">
                            <label className="text-gray-600">Address</label>
                            <textarea
                                placeholder="Enter Your Address"
                                rows="1"
                                {...register("address", { required: "Address is required" })}
                                className="w-full mt-1 p-2 border border-[#fadada] focus:border-[#f39993] rounded-md bg-red-50 outline-none"
                            ></textarea>
                            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                        </div>

                        {/* Password */}
                        <div className="mb-2">
                            <label className="text-gray-600">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Password must be at least 6 characters" },
                                    })}
                                    className="w-full mt-1 p-2 border border-[#fadada] focus:border-[#f39993] rounded-md bg-red-50 outline-none"
                                />
                                <span
                                    className="absolute right-3 top-4 cursor-pointer text-gray-500 text-xl"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-2">
                            <label className="text-gray-600">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    {...register("confirmPassword", {
                                        required: "Please confirm your password",
                                        validate: value => value === watch("password") || "Passwords do not match"
                                    })}
                                    className="w-full mt-1 p-2 border border-[#fadada] focus:border-[#f39993] rounded-md bg-red-50 outline-none"
                                />
                                <span
                                    className="absolute right-3 top-4 cursor-pointer text-gray-500 text-xl"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* Privacy Policy */}
                        <div className="mb-4">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="accent-red-500" {...register("agree", { required: true })} />
                                I agree to the Terms of Service and Privacy Policy
                            </label>
                            {errors.agree && (
                                <p className="text-red-500 text-sm">You must agree before submitting</p>
                            )}
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            className="w-full bg-red-500 text-white py-3 rounded-md text-lg hover:bg-red-600 disabled:opacity-50"
                            disabled={uploading}
                        >
                            {uploading ? "Uploading..." : "Create Account"}
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
