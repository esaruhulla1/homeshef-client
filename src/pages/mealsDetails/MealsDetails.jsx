import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";

const MealsDetails = () => {
    const { user, loading } = useContext(AuthContext);
    console.log(user);
    
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // 🔥 Fetch Single Meal
    const { data: meal, isLoading, isError } = useQuery({
        queryKey: ["meal", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals/${id}`);
            return res.data;
        }
    });

    // 🔥 Fetch Reviews
    const {
        data: reviews,
        isLoading: reviewLoading,
        refetch: refetchReviews
    } = useQuery({
        queryKey: ["reviews", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/review/${id}`);
            return res.data;
        }
    });

    // ⭐ Submit Review
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            return alert("You must be logged in to submit a review!");
        }

        const reviewData = {
            foodId: id,
            foodName: meal?.foodName,
            reviewerName: user?.displayName,
            reviewerImage: user?.photoURL,
            reviewerEmail: user?.email,
            rating: parseInt(rating),
            comment,
            date: new Date().toISOString()
        };

        try {
            const res = await axiosSecure.post("/review", reviewData);
            if (res.data.insertedId) {
                setSuccessMsg("Review submitted successfully!");
                setComment("");
                setRating(5);
                refetchReviews(); //  instantly update reviews in UI
                setTimeout(() => setSuccessMsg(""), 2000);
            }
        } catch (error) {
            console.error("Review Error:", error);
        }
    };

    const handleAddToFavorite = async () => {
        if (!user) {
            return toast.error("Please login first!");
        }

        const favoriteData = {
            userEmail: user.email,
            mealId: meal._id,
            mealName: meal.foodName,
            chefId: meal.chefId,
            chefName: meal.chefName,
            price: meal.price,
            addedTime: new Date().toISOString()
        };

        try {
            const res = await axiosSecure.post("/favorite", favoriteData);

            if (res.data?.insertedId) {
                toast.success("✅ Added to favorites!");
            }

        } catch (error) {
            if (error.response?.status === 409) {
                toast(" Already in your favorites!", {
                    icon: "⚠️",
                });
            } else {
                toast.error("Something went wrong!");
            }
        }
    };



    if (isLoading) return <p className="text-center py-20 text-xl">Loading...</p>;
    if (isError) return <p className="text-red-500 text-center py-20">Failed to load details.</p>;

    return (
        <div className="container mx-auto px-3 py-10 font-inter">

            {/* =======================
                 Meal Main Section
            ======================== */}
            <div className="flex flex-col lg:flex-row gap-10">
                <div className="lg:w-1/2">
                    <img
                        src={meal.foodImage}
                        alt={meal.foodName}
                        className="w-full md:h-[50vh] rounded-2xl shadow-lg object-cover"
                    />
                </div>

                <div className="lg:w-1/2 flex flex-col gap-3">
                    <h1 className="text-3xl font-bold">{meal.foodName}</h1>
                    <p className="text-lg">👨‍🍳 <strong>Chef:</strong> {meal.chefName}</p>
                    <p className="text-sm text-gray-500">🆔 Chef ID: {meal.chefId}</p>
                    <p className="text-lg font-bold text-red-500">💰 Price: ${meal.price}</p>
                    <p className="text-sm">⭐ Rating: {meal.rating}</p>
                    <p className="text-sm">📍 Delivery Area: {meal.delivery_Area}</p>
                    <p className="text-sm">⏱ Estimated Delivery Time: {meal.estimatedDeliveryTime}</p>
                    <p className="text-sm">🎓 Chef Experience: {meal.chefExperience}</p>

                    <div>
                        <h2 className="text-lg font-semibold mt-3">Ingredients:</h2>
                        <ul className="list-disc list-inside mt-1">
                            {meal.ingredients.map((ing, idx) => (
                                <li key={idx}>{ing}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col justify-between lg:flex-row mr-20 gap-3">
                        <button
                            onClick={() => navigate(`/order/${meal._id}`)}
                            className="mt- flex-1 bg-[#00c951] text-white py-2 px-6 rounded-xl"
                        >
                            Order Now
                        </button>

                        <button
                            onClick={handleAddToFavorite}
                            className="mt- flex-1 bg-cyan-500 text-white py-2 px-6 rounded-xl"
                        >
                            ❤️ Add to Favorite
                        </button>
                    </div>

                </div>
            </div>

            {/* ===============================
                 ⭐ Review Section
            ================================ */}
            <div className="mt-14">
                <h2 className="text-2xl font-bold mb-5">Customer Reviews</h2>

                {reviewLoading && <p className="text-gray-500">Loading reviews...</p>}

                {!reviewLoading && (!reviews || reviews.length === 0) && (
                    <p className="text-gray-500">No reviews yet.</p>
                )}

                {/* ⭐ Review List */}
                <div className="space-y-5">
                    {reviews?.map((review) => (
                        <div key={review._id} className="bg-white shadow p-5 rounded-xl">
                            <div className="flex gap-4 items-center">
                                <img
                                    src={review.reviewerImage}
                                    alt={review.reviewerName}
                                    className="w-14 h-14 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{review.reviewerName}</h3>
                                    <p className="text-sm text-yellow-600">⭐ {review.rating} / 5</p>
                                </div>
                            </div>

                            <div>
                                <p className="mt-3">{review.comment}</p>
                                <p className="text-xs text-gray-400 mt-2">
                                    {new Date(review.date).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ==========================
                     ⭐ Add Review Form
                =========================== */}
                <h2 className="text-xl font-semibold mt-10 mb-3">
                    ✍️ Write a Review
                </h2>

                {successMsg && (
                    <p className="text-green-600 font-medium mb-3">{successMsg}</p>
                )}

                <form onSubmit={handleReviewSubmit} className="bg-white p-5 rounded-xl shadow space-y-4">

                    {/* Rating */}
                    <div>
                        <label className="font-semibold">Rating:</label>
                        <select
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="border border-orange-200 p-2 rounded ml-3"
                        >
                            <option value={5}>⭐⭐⭐⭐⭐</option>
                            <option value={4}>⭐⭐⭐⭐</option>
                            <option value={3}>⭐⭐⭐</option>
                            <option value={2}>⭐⭐</option>
                            <option value={1}>⭐</option>
                        </select>
                    </div>

                    {/* Comment */}
                    <div>
                        <label className="font-semibold">Comment:</label>
                        <textarea
                            required
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write your review..."
                            className="w-full border border-orange-200 p-3 rounded mt-2"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-6 rounded-xl hover:bg-blue-700"
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MealsDetails;
