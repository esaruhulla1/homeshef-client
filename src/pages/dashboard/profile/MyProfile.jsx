import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

export default function MyProfile() {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    // Fetch main user data from DB
    const { data: userData = {}, isLoading } = useQuery({
        queryKey: ["singleUser", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/email/${user.email}`);
            return res.data;
        }
    });

    // Fetch user requests
    const { data: userRequests = [] } = useQuery({
        queryKey: ["userRequests", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/request/${user.email}`);
            return res.data;
        }
    });

    if (loading || isLoading) {
        return <p className="text-center mt-10 text-xl font-semibold">Loading...</p>;
    }

    const alreadyRequested = userRequests.length > 0;

    const handleRequest = async (type) => {
        if (alreadyRequested) {
            return Swal.fire({
                icon: "warning",
                title: "Request Already Sent!",
                text: "Your previous request is still pending.",
                confirmButtonColor: "#F97316",
            });
        }

        const body = {
            userName: userData.name,
            userEmail: userData.email,
            requestType: type,
            requestStatus: "pending",
            requestTime: new Date().toISOString(),
        };

        try {
            await axiosSecure.post("/request", body);
            Swal.fire({
                icon: "success",
                title: "Request Sent!",
                text: `Your ${type} request has been submitted successfully.`,
                confirmButtonColor: "#16A34A"
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to send request.",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-16">

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

                {/* LEFT SIDE — Profile Card */}
                <div className="bg-gray-100 shadow-sm rounded-xl overflow-hidden ">

                    <div className="py-12 px-10 text-center">
                        <img
                            src={userData.photoURL}
                            alt="profile"
                            className="w-40 h-40 rounded-full mx-auto mb-6 shadow-md object-cover"
                        />

                        <h2 className="text-3xl font-bold">{userData.name}</h2>
                        <p className="uppercase tracking-wide text-gray-700 mt-2">
                            {userData.role === "user" ? "Regular User" : userData.role}
                        </p>

                        <div className="w-12 h-[2px] bg-blue-600 mx-auto my-4"></div>

                        <p className="text-sm text-gray-600">📍 {userData.address}</p>
                        <p className="text-sm text-gray-600 mt-1">📧 {userData.email}</p>

                        {userData.role === "chef" && (
                            <p className="text-sm text-gray-700 mt-1">Chef ID: {userData._id}</p>
                        )}
                    </div>

                    {/* Social Icons */}
                    {/* <div className=" bg-white py-4 flex items-center justify-center gap-6 text-xl border-t">
                        <i className="fa-brands fa-facebook cursor-pointer hover:text-blue-600"></i>
                        <i className="fa-brands fa-twitter cursor-pointer hover:text-blue-400"></i>
                        <i className="fa-brands fa-linkedin cursor-pointer hover:text-blue-700"></i>
                        <i className="fa-brands fa-instagram cursor-pointer hover:text-pink-500"></i>
                    </div> */}
                </div>

                {/* RIGHT SIDE — Content Section */}
                <div className="flex flex-col justify-center">

                    <h1 className="text-6xl font-extrabold mb-4">Hello</h1>
                    <p className="text-xl text-gray-700 mb-6">
                        Here's who I am & what I do
                    </p>

                    {/* Buttons */}
                    <div className="flex items-center gap-4 mb-8">

                        {userData.role !== "chef" && userData.role !== "admin" && (
                            <button
                                onClick={() => handleRequest("chef")}
                                className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                            >
                                Be a Chef
                            </button>
                        )}

                        {userData.role !== "admin" && (
                            <button
                                onClick={() => handleRequest("admin")}
                                className="px-6 py-3 rounded-full border border-gray-700 text-gray-700 font-semibold hover:bg-gray-100 transition"
                            >
                                Be an Admin
                            </button>
                        )}
                    </div>

                    {/* Some Profile Details */}
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Welcome to your profile! Here you can manage your account, view
                        your activity and update your profile details.
                    </p>

                    <p className="text-gray-600 mb-2">
                        <strong>Account Status:</strong> {userData.status}
                    </p>

                    <p className="text-gray-600 mb-2">
                        <strong>Joined:</strong>{" "}
                        {new Date(userData.createdAt).toLocaleDateString()}
                    </p>

                    <p className="text-gray-600 mb-2">
                        <strong>Request Status:</strong>{" "}
                        {alreadyRequested ? (
                            <span className="text-orange-600 font-semibold">Pending</span>
                        ) : (
                            "No Requests Yet"
                        )}
                    </p>

                    {/* Extra content from AuthContext user */}
                    <div className="mt-6 bg-white p-5 rounded-xl shadow">
                        <h3 className="font-semibold text-xl mb-3">More Info</h3>

                        <p className="text-gray-700"><strong>Display Name:</strong> {user?.displayName}</p>
                        <p className="text-gray-700"><strong>Email:</strong> {user?.email}</p>
                        <p className="text-gray-700"><strong>PhotoURL:</strong> {user?.photoURL}</p>
                        <p className="text-gray-700"><strong>Email Verified:</strong> {user?.emailVerified ? "Yes" : "No"}</p>
                        <p className="text-gray-700"><strong>UID:</strong> {user?.uid}</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
