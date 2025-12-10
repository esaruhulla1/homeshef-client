import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MealsDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // 🔥 Fetch single meal
    const { data: meal, isLoading, isError } = useQuery({
        queryKey: ["meal", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals/${id}`);
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="text-center py-20 text-xl font-semibold">
                Loading meal details...
            </div>
        );
    }

    if (isError || !meal) {
        return (
            <div className="text-center py-20 text-red-500 text-xl font-semibold">
                Failed to load meal details.
            </div>
        );
    }

    return (
        <div className="container mx-auto px-3 py-10 font-inter">
            <div className="flex flex-col lg:flex-row gap-10">

                {/* Meal Image */}
                <div className="lg:w-1/2">
                    <img
                        src={meal.foodImage}
                        alt={meal.foodName}
                        className="w-full h-[60vh] rounded-2xl shadow-lg"
                    />
                </div>

                {/* Meal Info */}
                <div className="lg:w-1/2 flex flex-col gap-4">
                    <h1 className="text-3xl font-bold">{meal.foodName}</h1>

                    <p className="text-lg">
                        👨‍🍳 <strong>Chef:</strong> {meal.chefName}
                    </p>

                    <p className="text-sm text-gray-500">
                        🆔 Chef ID: {meal.chefId}
                    </p>

                    <p className="text-lg font-bold text-red-500">
                        💰 Price: ${meal.price}
                    </p>

                    <p className="text-sm">⭐ Rating: {meal.rating}</p>

                    <p className="text-sm">
                        📍 Delivery Area: {meal.delivery_Area}
                    </p>

                    <p className="text-sm">
                        ⏱ Estimated Delivery Time: {meal.estimatedDeliveryTime}
                    </p>

                    <p className="text-sm">
                        🎓 Chef Experience: {meal.chefExperience}
                    </p>

                    <div>
                        <h2 className="text-lg font-semibold mt-3">Ingredients:</h2>
                        <ul className="list-disc list-inside mt-1">
                            {meal.ingredients.map((ing, idx) => (
                                <li key={idx}>{ing}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Order Button */}
                    <button
                        onClick={() => navigate(`/order/${meal._id}`)}
                        className="mt-6 bg-red-500 text-white py-2 px-6 rounded-xl shadow hover:bg-red-600 transition"
                    >
                        Order Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MealsDetails;
