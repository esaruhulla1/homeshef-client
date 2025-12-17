import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
import Loading from "../shared/loading";

export default function PopulerMeals() {
    const axiosSecure = useAxiosSecure();

    // 🔥 TanStack Query Fetch
    const { data: meals = [], isLoading, isError, error } = useQuery({
        queryKey: ["populer_meals"],
        queryFn: async () => {
            const res = await axiosSecure.get("/populer-meals");
            return res.data;
        }
    });

    // ⏳ Loading State
    if (isLoading) {
        return (
            <div className="text-center py-20 text-xl font-semibold">
                <Loading></Loading>
            </div>
        );
    }

    // ❌ Error State
    if (isError) {
        return (
            <div className="text-center py-20 text-red-500 text-xl font-semibold">
                Failed to load meals: {error.message}
            </div>
        );
    }
    return (
        <div className="container mx-auto">
            <div className="w-full text-center py-10 font-inter">
                <p className="text-red-500 text-sm">Our Menu</p>
                <h1 className="text-3xl font-bold mt-2 mb-8 leading-snug">
                    Menu That Always Make You <br /> To Fall In Love
                </h1>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto">
                    {meals.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white rounded p-3 shadow-md  hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* FIXED IMAGE SIZE */}
                            <div className="w-full  flex justify-center mb-4">
                                <img
                                    src={item.foodImage}
                                    alt={item.foodName}
                                    className="w-full h-50 object-cover "
                                />
                            </div>

                            <h3 className="text-lg font-bold text-gray-800">
                                {item.foodName}
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                Chef: {item.chefName}
                            </p>

                            <p className="text-xl font-bold text-red-500 my-4">
                                ${item.price}
                            </p>

                            {/* See Details */}
                            <Link
                                to={`/meal/${item._id}`}
                                className="block w-full text-center bg-red-500 text-white py-2 rounded-xl mt-4 hover:bg-red-600"
                            >
                                See Details
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

}
