import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";

const Meals = () => {
    const axiosSecure = useAxiosSecure();

    // 🔥 Sort state
    const [sortOrder, setSortOrder] = useState("asc");

    // 🔥 Fetch meals with React Query
    const { data: meals = [], isLoading } = useQuery({
        queryKey: ["meals", sortOrder],
        queryFn: async () => {
            const res = await axiosSecure.get("/meals");
            let data = res.data;

            // Sort by price
            data = data.sort((a, b) =>
                sortOrder === "asc"
                    ? a.price - b.price
                    : b.price - a.price
            );

            return data;
        }
    });

    if (isLoading) {
        return (
            <div className="text-center py-20 text-xl font-semibold">
                Loading meals...
            </div>
        );
    }

    return (
        <div className="container mx-auto px-3 py-10 font-inter">

            {/* Header + Sort Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h1 className="text-3xl font-bold mb-4 sm:mb-0">All Meals</h1>

                <div>
                    <button
                        onClick={() => setSortOrder("asc")}
                        className={`px-4 py-2 rounded-l-lg border ${sortOrder === "asc" ? "bg-red-500 text-white" : "bg-white"}`}
                    >
                        Sort: Low → High
                    </button>

                    <button
                        onClick={() => setSortOrder("desc")}
                        className={`px-4 py-2 rounded-r-lg border ${sortOrder === "desc" ? "bg-red-500 text-white" : "bg-white"}`}
                    >
                        Sort: High → Low
                    </button>
                </div>
            </div>

            {/* Meals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {meals.map(meal => (

                    < div
                        key={meal._id}
                        className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition"
                    >
                        <img
                            src={meal.foodImage}
                            alt={meal.foodName}
                            className="w-full h-48 object-cover rounded-lg"
                        />

                        <h2 className="text-xl font-bold mt-4">{meal.foodName}</h2>

                        {/* Chef Info */}
                        <p p className="text-sm mt-1 text-gray-500" >
                            👨‍🍳 Chef: <span className="font-medium">{meal.chefName}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                            🆔 Chef ID: {meal.chefId}
                        </p>

                        {/* Price + Rating */}
                        <p className="text-lg font-bold text-red-500 mt-3">
                            ${meal.price}
                        </p>

                        <p className="text-sm mt-1">
                            ⭐ Rating: {meal.rating}
                        </p>

                        <p className="text-sm mt-1 text-gray-600">
                            📍 Delivery Area: {meal.delivery_Area}
                        </p>

                        {/* See Details */}
                        <Link
                            to={`/meal/${meal._id}`}
                            className="block w-full text-center bg-red-500 text-white py-2 rounded-xl mt-4 hover:bg-red-600"
                        >
                            See Details
                        </Link>

                    </div>

                    
                ))
                }
            </div >
        </div >
    );
};

export default Meals;
