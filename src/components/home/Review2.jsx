import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaUtensils } from "react-icons/fa";
import axios from 'axios';

const Review2 = () => {
    const [reviews, setReviews] = useState([]);
    const [visibleIndex, setVisibleIndex] = useState(0); // For simple prev/next

    useEffect(() => {
        // Fetch all reviews from backend
        const fetchReviews = async () => {
            try {
                const res = await axios.get('http://localhost:5000/reviews'); // backend route
                setReviews(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchReviews();
    }, []);

    // Handle left/right arrows
    const handlePrev = () => {
        setVisibleIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        setVisibleIndex((prev) => Math.min(prev + 1, reviews.length - 3)); // show 3 cards max
    };

    // Slice 3 reviews to show in grid
    const visibleReviews = reviews.slice(visibleIndex, visibleIndex + 3);

    return (
        <div>
            <section className="w-full py-20 pt-35 font-sans">
                <div className="container mx-auto px-6">
                    {/* Top Section */}
                    <div className="flex justify-center text-center">
                        <div>
                            <div className="flex items-center gap-2 text-sm font-medium text-[#E49A3B]">
                                <p className="text-red-500 font-medium mb-2 mx-auto">WALL OF LOVE</p>
                            </div>
                            <h2 className="text-4xl font-bold mt-3 text-gray-900">
                                What Our Happy Customers Say
                            </h2>
                            <p className="text-gray-500 mx-auto mt-4 text-base max-w-md leading-relaxed">
                                Discover why thousands of food lovers trust us for their daily meals. Real
                                reviews from real customers.
                            </p>
                        </div>
                    </div>

                    {/* Reviews Cards */}
                    <div className="relative mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Left Arrow */}
                        <button
                            onClick={handlePrev}
                            className="absolute -left-5 top-1/2 -translate-y-1/2 bg-white shadow-md w-10 h-10 flex items-center justify-center rounded-full"
                        >
                            <FaArrowLeft className="text-black" />
                        </button>

                        {visibleReviews.map((review) => (
                            <div key={review._id} className="bg-white p-6 rounded-2xl shadow-md">
                                <div className="text-yellow-500">
                                    {'★'.repeat(review.rating)}
                                </div>
                                <p className="text-gray-900 mt-4 leading-relaxed">
                                    {review.comment}
                                </p>
                                <p className="text-gray-400 text-xs mt-3">
                                    {new Date(review.date).toLocaleDateString()}
                                </p>
                                <div className="flex items-center gap-3 mt-6">
                                    <img
                                        src={review.reviewerImage}
                                        alt={review.reviewerName}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-900">{review.reviewerName}</p>
                                        <p className="text-sm text-gray-500">Customer</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Right Arrow */}
                        <button
                            onClick={handleNext}
                            className="absolute -right-5 top-1/2 -translate-y-1/2 bg-white shadow-md w-10 h-10 flex items-center justify-center rounded-full"
                        >
                            <FaArrowRight className="text-black" />
                        </button>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-24 bg-[#fef5f5] rounded-3xl p-7 py-15 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Join thousands of happy foodies
                            </h2>
                            <p className="text-gray-500 mt-2">
                                Ready to experience the best local food delivery? Order your first meal today
                                and get <span className="text-orange-500 font-semibold">free delivery</span> on us.
                            </p>
                        </div>

                        <button className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl text-lg shadow-md">
                            <FaUtensils /> Order Now
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Review2;
