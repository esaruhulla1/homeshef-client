import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

export default function Order() {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const [quantity, setQuantity] = useState(1);
    const [address, setAddress] = useState("");

    // Fetch meal details
    const { data: meal, isLoading } = useQuery({
        queryKey: ["meal", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals/${id}`);
            return res.data;
        },
    });

    if (isLoading) return <div className="text-center py-10">Loading...</div>;

    const totalPrice = meal.price * quantity;

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
            cancelButtonText: "Cancel",
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

                const res = await axiosSecure.post("/orders", orderData);

                if (res.data.insertedId) {
                    Swal.fire("Success!", "Order placed successfully!", "success");

                }
            }
        });
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Confirm Your Order</h2>

            {/* Meal info auto-filled */}
            <div className="space-y-3">
                <div>
                    <label className="font-semibold">Meal Name:</label>
                    <input
                        type="text"
                        value={meal.foodName}
                        disabled
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="font-semibold">Price:</label>
                    <input
                        type="text"
                        value={`$${meal.price}`}
                        disabled
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* Quantity */}
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

                {/* User Email */}
                <div>
                    <label className="font-semibold">Your Email:</label>
                    <input
                        type="text"
                        value={user?.email}
                        disabled
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* Address */}
                <div>
                    <label className="font-semibold">Delivery Address:</label>
                    <textarea
                        placeholder="Enter full address..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full border p-2 rounded"
                        rows={3}
                    ></textarea>
                </div>

                {/* Total Price */}
                <p className="text-lg font-semibold">
                    Total Price: <span className="text-green-600">${totalPrice}</span>
                </p>

                <button
                    onClick={handleOrder}
                    className="bg-orange-600 w-full text-white py-2 rounded mt-4 hover:bg-orange-700"
                >
                    Confirm Order
                </button>
            </div>
        </div>
    );
}
