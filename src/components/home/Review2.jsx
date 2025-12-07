import React from 'react';
import { FaArrowLeft, FaArrowRight, FaUtensils } from "react-icons/fa";

const Review2 = () => {
    return (
        <div>
            <section className="w-full  py-20 pt-35 font-sans">
                <div className="container mx-auto px-6">
                    {/* Top Section */}
                    <div className=" flex   justify-center text-center ">
                        {/* Text Content */}
                        <div className=" ">
                            <div className="flex   items-center gap-2 text-sm font-medium text-[#E49A3B]">
                                <h3 className="text-xl mx-auto ">🧡 WALL OF LOVE</h3> 
                            </div>

                            <h2 className="text-4xl font-bold mt-3 text-gray-900">
                                What Our Happy  Customers Say
                            </h2>

                            <p className="text-gray-500 mt-4 text-base max-w-md leading-relaxed">
                                Discover why thousands of food lovers trust us for their daily meals. Real
                                reviews from real customers.
                            </p>
                        </div>

                    </div>

                    {/* Reviews Cards */}
                    <div className="relative mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Left Arrow */}
                        <button className="absolute -left-5 top-1/2 -translate-y-1/2 bg-white shadow-md w-10 h-10 flex items-center justify-center rounded-full">
                            <FaArrowLeft />
                        </button>

                        {/* Card 1 */}
                        <div className="bg-white p-6 rounded-2xl shadow-md">
                            <div className="text-yellow-500">★★★★★</div>
                            <p className="text-gray-900 mt-4 leading-relaxed">
                                "Fastest delivery I've ever experienced! The food arrived hot and fresh.
                                The app is super intuitive and tracking my order was seamless."
                            </p>
                            <p className="text-gray-400 text-xs mt-3">2 DAYS AGO</p>

                            <div className="flex items-center gap-3 mt-6">
                                <img
                                    src="https://i.pravatar.cc/60?img=32"
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold text-gray-900">Sarah Mitchell</p>
                                    <p className="text-sm text-gray-500">Frequent Orderer</p>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-6 rounded-2xl shadow-md">
                            <div className="text-yellow-500">★★★★★</div>
                            <p className="text-gray-900 mt-4 leading-relaxed">
                                "Great variety for the whole family. Sunday dinner is sorted without any
                                hassle. The portions were generous and packaging eco‑friendly."
                            </p>
                            <p className="text-gray-400 text-xs mt-3">1 WEEK AGO</p>

                            <div className="flex items-center gap-3 mt-6">
                                <img
                                    src="https://i.pravatar.cc/60?img=15"
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold text-gray-900">Mark Johnson</p>
                                    <p className="text-sm text-gray-500">Family Plan User</p>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white p-6 rounded-2xl shadow-md">
                            <div className="text-yellow-500">★★★★★</div>
                            <p className="text-gray-900 mt-4 leading-relaxed">
                                "Perfect for late night study snacks. The student discount is a lifesaver.
                                Sometimes delivery takes a bit longer on weekends but worth it."
                            </p>
                            <p className="text-gray-400 text-xs mt-3">2 WEEKS AGO</p>

                            <div className="flex items-center gap-3 mt-6">
                                <img
                                    src="https://i.pravatar.cc/60?img=5"
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold text-gray-900">Mike Thompson</p>
                                    <p className="text-sm text-gray-500">Student Foodie</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Arrow */}
                        <button className="absolute -right-5 top-1/2 -translate-y-1/2 bg-white shadow-md w-10 h-10 flex items-center justify-center rounded-full">
                            <FaArrowRight />
                        </button>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-24 bg-[#fef5f5] rounded-3xl  p-7 py-15 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
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