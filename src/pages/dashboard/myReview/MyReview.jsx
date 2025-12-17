import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../../components/shared/loading";

const MyReview = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [editingReview, setEditingReview] = useState(null);

    // Fetch My Reviews
    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ["myReviews", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-reviews/${user.email}`);
            return res.data;
        },
    });

    // Delete Review
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this review?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/review/${id}`);
                Swal.fire("Deleted!", "Review deleted successfully", "success");
                queryClient.invalidateQueries(["myReviews"]);
            }
        });
    };

    // Update Submit
    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedReview = {
            rating: e.target.rating.value,
            comment: e.target.comment.value,
            date: new Date().toISOString(),
        };

        await axiosSecure.put(`/review/${editingReview._id}`, updatedReview);

        Swal.fire("Success", "Review updated successfully!", "success");
        setEditingReview(null);
        queryClient.invalidateQueries(["myReviews"]);
    };

    if (loading || isLoading) return <p ><Loading></Loading></p>;

    return (
        <div className="max-w-6xl  mx-auto p-4 pt-2">
            <h2 className="text-2xl font-bold mb-5 mr-10 text-center">My Reviews</h2>

            {reviews.length === 0 ? (
                <p className="text-center text-gray-500">No reviews yet.</p>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="hidden sm:block overflow-x-auto  rounded-md shadow">
                        <table className="min-w-full border-collapse ">
                            <thead>
                                <tr className="bg-gray-200 text-left">
                                    <th className="p-3 border border-pink-50">Meal Name</th>
                                    <th className="p-3 border border-pink-50">Rating</th>
                                    <th className="p-3 border border-pink-50">Comment</th>
                                    <th className="p-3 border border-pink-50">Date</th>
                                    <th className="p-3 border border-pink-50 text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {reviews.map((review) => (
                                    <tr key={review._id} className="hover:bg-gray-50">
                                        <td className="p-3 border border-pink-50">{review.foodName}</td>
                                        <td className="p-3 border border-pink-50">⭐ {review.rating}</td>
                                        <td className="p-3 border border-pink-50">{review.comment}</td>
                                        <td className="p-3 border border-pink-50 text-sm text-gray-600">
                                            {new Date(review.date).toLocaleString()}
                                        </td>

                                        <td className="p-3 border border-pink-50 text-center space-x-2">
                                            <button
                                                onClick={() => setEditingReview(review)}
                                                className="px-3 py-1 bg-blue-500 text-white rounded"
                                            >
                                                Update
                                            </button>

                                            <button
                                                onClick={() => handleDelete(review._id)}
                                                className="px-3 py-1 bg-red-500 text-white rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="sm:hidden space-y-4">
                        {reviews.map((review) => (
                            <div
                                key={review._id}
                                className="p-4 border rounded-lg shadow-sm bg-white"
                            >
                                <h3 className="text-lg font-semibold">{review.mealName}</h3>

                                <p><strong>Rating:</strong> ⭐ {review.rating}</p>

                                <p className="mt-1"><strong>Comment:</strong> {review.comment}</p>

                                <p className="text-sm text-gray-500 mt-1">
                                    {new Date(review.date).toLocaleString()}
                                </p>

                                <div className="flex gap-3   mt-3">
                                    <button
                                        onClick={() => setEditingReview(review)}
                                        className="flex-1 px-3 py-1 mt-5 bg-blue-500 text-white rounded"
                                    >
                                        Update
                                    </button>

                                    <button
                                        onClick={() => handleDelete(review._id)}
                                        className="flex-1  px-3 py-1 bg-red-500 text-white rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Update Modal */}
            {editingReview && (
                <div className="fixed inset-0 bg-white bg-opacity-40 flex justify-center items-center">
                    <div className="bg-indigo-50 p-6 rounded shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Update Review</h2>

                        <form onSubmit={handleUpdate}>
                            <label className="block mb-2">Rating</label>
                            <input
                                type="number"
                                name="rating"
                                defaultValue={editingReview.rating}
                                min="1"
                                max="5"
                                className="w-full border px-3 py-2 rounded mb-3"
                                required
                            />

                            <label className="block mb-2">Comment</label>
                            <textarea
                                name="comment"
                                defaultValue={editingReview.comment}
                                className="w-full border px-3 py-2 rounded mb-3"
                                required
                            ></textarea>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setEditingReview(null)}
                                    className="px-3 py-1 bg-gray-400 text-white rounded"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-3 py-1 bg-green-600 text-white rounded"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyReview;



// import React, { useContext, useState } from "react";
// import { AuthContext } from "../../../Context/AuthContext";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import Swal from "sweetalert2";

// const MyReview = () => {
//     const { user, loading } = useContext(AuthContext);
//     const axiosSecure = useAxiosSecure();
//     const queryClient = useQueryClient();

//     const [editingReview, setEditingReview] = useState(null); // modal data

//     // ⚡ Fetch My Reviews
//     const { data: reviews = [], isLoading } = useQuery({
//         queryKey: ["myReviews", user?.email],
//         enabled: !!user?.email,
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/my-reviews/${user.email}`);
//             return res.data;
//         },
//     });

//     // ⚡ Delete Review
//     const handleDelete = (id) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You want to delete this review?",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonText: "Yes, Delete",
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 await axiosSecure.delete(`/review/${id}`);
//                 Swal.fire("Deleted!", "Review deleted successfully", "success");
//                 queryClient.invalidateQueries(["myReviews"]);
//             }
//         });
//     };

//     // ⚡ Update Review submit
//     const handleUpdate = async (e) => {
//         e.preventDefault();

//         const updatedReview = {
//             rating: e.target.rating.value,
//             comment: e.target.comment.value,
//             date: new Date().toISOString()
//         };

//         await axiosSecure.put(`/review/${editingReview._id}`, updatedReview);

//         Swal.fire("Success", "Review updated successfully!", "success");
//         setEditingReview(null);
//         queryClient.invalidateQueries(["myReviews"]);
//     };

//     if (loading || isLoading) return <p>Loading...</p>;

//     return (
//         <div className="max-w-4xl mx-auto p-5">
//             <h2 className="text-2xl font-bold mb-5">My Reviews</h2>

//             {reviews.length === 0 && (
//                 <p className="text-center text-gray-500">No reviews yet.</p>
//             )}

//             <div className="space-y-4">
//                 {reviews.map((review) => (
//                     <div
//                         key={review._id}
//                         className="p-4 border rounded-lg shadow-sm flex justify-between items-start"
//                     >
//                         <div>
//                             <h3 className="text-lg font-semibold">{review.mealName}</h3>
//                             <p><strong>Rating:</strong> ⭐ {review.rating}</p>
//                             <p><strong>Comment:</strong> {review.comment}</p>
//                             <p className="text-sm text-gray-500">
//                                 {new Date(review.date).toLocaleString()}
//                             </p>
//                         </div>

//                         <div className="space-x-2">
//                             <button
//                                 onClick={() => setEditingReview(review)}
//                                 className="px-3 py-1 bg-blue-500 text-white rounded"
//                             >
//                                 Update
//                             </button>
//                             <button
//                                 onClick={() => handleDelete(review._id)}
//                                 className="px-3 py-1 bg-red-500 text-white rounded"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* ⭐ Update Modal */}
//             {editingReview && (
//                 <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
//                     <div className="bg-white p-5 rounded shadow-lg w-96">
//                         <h2 className="text-xl font-semibold mb-4">
//                             Update Review
//                         </h2>

//                         <form onSubmit={handleUpdate}>
//                             <label className="block mb-2">Rating</label>
//                             <input
//                                 type="number"
//                                 name="rating"
//                                 defaultValue={editingReview.rating}
//                                 min="1"
//                                 max="5"
//                                 className="w-full border px-3 py-2 rounded mb-3"
//                                 required
//                             />

//                             <label className="block mb-2">Comment</label>
//                             <textarea
//                                 name="comment"
//                                 defaultValue={editingReview.comment}
//                                 className="w-full border px-3 py-2 rounded mb-3"
//                                 required
//                             ></textarea>

//                             <div className="flex justify-end gap-2">
//                                 <button
//                                     type="button"
//                                     onClick={() => setEditingReview(null)}
//                                     className="px-3 py-1 bg-gray-400 text-white rounded"
//                                 >
//                                     Cancel
//                                 </button>

//                                 <button
//                                     type="submit"
//                                     className="px-3 py-1 bg-green-600 text-white rounded"
//                                 >
//                                     Update
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyReview;

