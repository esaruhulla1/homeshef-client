import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export default function MyOrder() {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    // 🔥 Fetch Orders
    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["myOrders", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/${user.email}`);
            return res.data;
        },
    });

    if (loading || isLoading) {
        return (
            <p className="text-center py-10 text-lg font-semibold">Loading orders...</p>
        );
    }


    const handlePayment = async (order) => {
        try {
            const res = await axiosSecure.post("/create-payment", {
                orderId: order._id,
                price: order.price,
                mealName: order.mealName,
                userEmail: user.email
            });

            window.location = res.data.url; // Redirect to Stripe
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                My Orders
            </h1>

            {/* Empty State */}
            {orders.length === 0 && (
                <p className="text-center text-gray-500 py-10">
                    You have not placed any orders yet.
                </p>
            )}

            {/* Card Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className=" border border-gray-200 rounded-xl shadow-sm p-5 bg-white hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-bold mb-2">{order.mealName}</h2>

                        <p><span className="font-semibold">Price:</span> ${order.price}</p>

                        <p>
                            <span className="font-semibold">Quantity:</span>{" "}
                            {order.quantity}
                        </p>

                        <p>
                            <span className="font-semibold">Order Status:</span>{" "}
                            <span
                                className={`px-2 py-1 rounded text-white text-sm
                                ${order.orderStatus === "pending" && "bg-orange-500"}
                                ${order.orderStatus === "preparing" && "bg-blue-500"}
                                ${order.orderStatus === "delivered" && "bg-green-600"}
                                ${order.orderStatus === "accepted" && "bg-purple-600"}
                                `}
                            >
                                {order.orderStatus}
                            </span>
                        </p>

                        <p>
                            <span className="font-semibold">Payment Status:</span>{" "}
                            {order.paymentStatus}
                        </p>

                        {/* <p>
                            <span className="font-semibold">Chef Name:</span>{" "}
                            {order.chefName}
                        </p> */}

                        <p>
                            <span className="font-semibold">Chef ID:</span>{" "}
                            {order.chefId}
                        </p>

                        <p>
                            <span className="font-semibold">Delivery Time:</span>{" "}
                            {new Date(order.orderTime).toLocaleString()}
                        </p>

                        {/* Payment Button */}
                        <div className="relative group w-full">
                            <button
                                disabled={!(order.orderStatus === "accepted" && order.paymentStatus === "pending")}
                                onClick={() => handlePayment(order)}
                                className={`relative w-full py-2 rounded-lg font-semibold
            ${!(order.orderStatus === "accepted" && order.paymentStatus === "pending")
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-green-600 hover:bg-green-700 text-white"
                                    }
        `}
                            >
                                {order.paymentStatus === "paid" ? "Already Paid" : "Pay Now"}
                            </button>

                            {/* Tooltip */}
                            {order.paymentStatus !== "paid" &&
                                order.orderStatus !== "accepted" && (
                                    <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 px-3 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        Waiting for Chef to accept the order
                                    </span>
                                )}
                        </div>


                    </div>
                ))}
            </div>
        </div>
    );
}
