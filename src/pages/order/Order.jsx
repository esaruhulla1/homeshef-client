import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../components/shared/loading";

export default function Order() {
    useEffect(() => {
        document.title = " HomeShef | Order ";
    }, []);

    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);
    const [address, setAddress] = useState("");


    // 🔐 Fetch Server User by Email

    const {
        data: serverUser,
        isLoading: serverUserLoading,
    } = useQuery({
        queryKey: ["serverUser", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/email/${user.email}`);
            return res.data;
        },
    });

    // 🍽️ Fetch Meal Data

    const {
        data: meal,
        isLoading: mealLoading,
    } = useQuery({
        queryKey: ["meal", id],
        enabled: !!id,
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals/${id}`);
            return res.data;
        },
    });


    // 🔔 Fraud Alert (Server Based)

    useEffect(() => {
        if (serverUser?.status === "fraud") {
            Swal.fire(
                "Blocked!",
                "Fraud users cannot place orders",
                "error"
            );
        }
    }, [serverUser]);


    // UI Loading States

    if (serverUserLoading || mealLoading) {
        return <div className="text-center py-20 text-xl"><Loading></Loading></div>;
    }

    if (serverUser?.status === "fraud") {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-red-600">
                    You are blocked 🚫
                </h2>
                <p className="mt-2">Fraud users cannot place orders.</p>
            </div>
        );
    }


    // 🚀 Total Price

    const totalPrice = meal.price * quantity;


    // 🛒 Handle Order

    const handleOrder = () => {
        if (!address) {
            return Swal.fire("Error", "Please enter your delivery address", "error");
        }

        Swal.fire({
            title: "Confirm Order?",
            text: `Your total price is $${totalPrice}. Do you want to confirm the order?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, confirm",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const orderData = {
                    foodId: meal._id,
                    mealName: meal.foodName,
                    price: meal.price,
                    quantity,
                    chefId: meal.chefId,
                    userEmail: user?.email,
                    userAddress: address,
                    paymentStatus: "pending",
                    orderStatus: "pending",
                    orderTime: new Date().toISOString(),
                };

                try {
                    const res = await axiosSecure.post("/orders", orderData);

                    if (res.data.insertedId) {
                        Swal.fire("Success!", "Order placed successfully!", "success")
                            .then(() => {
                                navigate("/meals"); // ✅ navigate after order
                            });
                    }
                } catch (error) {
                    Swal.fire(
                        "Blocked",
                        error?.response?.data?.message || "Order failed",
                        "error"
                    );
                }
            }
        });
    };


    // 📦 UI

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
            <h2 className="text-2xl font-bold mb-6 text-center">
                Confirm Your Order
            </h2>

            <div className="space-y-3">
                <div>
                    <label className="font-semibold">Meal Name:</label>
                    <input
                        value={meal.foodName}
                        disabled
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="font-semibold">Price:</label>
                    <input
                        value={`$${meal.price}`}
                        disabled
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="font-semibold">Quantity:</label>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="font-semibold">Your Email:</label>
                    <input
                        value={user?.email}
                        disabled
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="font-semibold">Delivery Address:</label>
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full border p-2 rounded"
                        rows={3}
                    />
                </div>

                <p className="text-lg font-semibold">
                    Total Price:
                    <span className="text-green-600"> ${totalPrice}</span>
                </p>

                <button
                    onClick={handleOrder}
                    disabled={serverUser?.status === "fraud"}
                    className="bg-orange-600 w-full text-white py-2 rounded mt-4
                               hover:bg-orange-700 disabled:bg-gray-400"
                >
                    Confirm Order
                </button>
            </div>
        </div>
    );
}
