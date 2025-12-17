import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../components/shared/loading";

export default function MyFavorite() {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    // 🔥 Fetch favorite meals
    const {
        data: favorites = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["myFavorites", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/favorites/${user.email}`);
            return res.data;
        },
    });

    // 🗑 Delete favorite item
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to remove this meal from favorites?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, remove it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/favorite/${id}`);
                Swal.fire("Removed!", "Meal removed from favorites successfully.", "success");
                refetch();
            }
        });
    };

    if (loading || isLoading) {
        return <p ><Loading></Loading></p>;
    }

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                My Favorite Meals
            </h1>

            {/* If empty */}
            {favorites.length === 0 && (
                <p className="text-center text-gray-500 py-10">No favorite meals found.</p>
            )}

            {/* Responsive Table */}
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3">Meal Name</th>
                            <th className="p-3">Chef Name</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Date Added</th>
                            <th className="p-3 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {favorites.map((item) => (
                            <tr key={item._id} className=" hover:bg-gray-100">
                                <td className="p-3">{item.mealName}</td>
                                <td className="p-3">{item.chefName}</td>
                                <td className="p-3">${item.price}</td>
                                <td className="p-3">
                                    {new Date(item.addedTime).toLocaleDateString()}
                                </td>
                                <td className="p-3 text-center">
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
