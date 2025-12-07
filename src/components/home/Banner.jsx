import React from "react";
import { FaPlay, FaShoppingCart, FaClock } from "react-icons/fa";


export default function Banner() {
    return (
        <section className="w-full  py-20 bg-[#fef5f5]">
            <div className="container mx-auto  grid grid-cols-1 md:grid-cols-2  items-center px-6">
                {/* LEFT CONTENT */}
                <div className="space-y-8  ">
                    {/* Top badge */}
                    <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-1.5 rounded-full text-sm font-medium text-red-600">
                        More than Faster <FaPlay className="text-xs" />
                    </div>

                    <h1 className="text-5xl font-extrabold leading-tight text-gray-900">
                        Be The Fastest
                        <br /> In Delivering Your {" "}
                        <span className="text-red-500">Food</span>
                    </h1>

                    <p className="text-gray-500 max-w-md">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                        vulputate libero et velit interdum, ac aliquet odio mattis.
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-20">
                        <button className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-red-600 transition">
                            Order Now
                        </button>

                        <button className="z-10 bg-white border border-gray-300 px-6 py-3 rounded-full text-lg font-semibold shadow hover:shadow-md transition flex items-center gap-2">
                            <FaPlay className="text-red-500" /> Order Process
                        </button>
                    </div>
                </div>

                {/* RIGHT IMAGE SECTION */}
                <div className=" relative flex justify-center pr-0 lg:pr-20">
                    {/* chef image */}
                    <img
                        src="/banner_chef.png"
                        alt="woman holding salad"
                        className="w-[50%] z-10 "
                    />

                    {/* Red background shape */}
                    <div className="absolute bottom-0 z-9 w-95 h-72 bg-red-500 rounded-3xl -z-10" style={{ clipPath: "polygon(0 0, 100% 10%, 100% 100%, 0% 100%)" }}></div>

                    {/* Fresh Orange Card */}
                    <div className="absolute -top-6 right-4 bg-white shadow-lg rounded-xl p-4 w-40 text-center">
                        <img src="/banner_Burger.jpg" alt="orange" className="w-16 mx-auto" />
                        <h4 className="font-semibold text-gray-800 text-sm">Fresh Orange</h4>
                        <p className="text-gray-600 font-bold">$44.60</p>
                        <p className="text-gray-400 text-xs">Free Shipping</p>
                        <button className="mt-2 bg-red-500 w-full py-2 rounded-lg text-white text-sm flex justify-center">
                            <FaShoppingCart />
                        </button>
                    </div>

                    {/* Delivery Card */}
                    <div className="absolute top-100 right-4 bg-white shadow-md rounded-xl p-3 flex items-center gap-3 w-36">
                        <FaClock className="text-green-500 text-xl" />
                        <div>
                            <p className="font-semibold text-gray-700 text-sm">Delivery</p>
                            <p className="text-xs text-gray-400">30 Min</p>
                        </div>
                    </div>

                    {/* Burger Card */}
                    <div className=" md: absolute bottom-6 -left-25 bg-white shadow-md rounded-xl p-3 w-48 flex gap-3 items-center">
                        <img src="/banner_Burger.jpg" alt="burger" className="w-12 h-12 rounded-md" />
                        <div>
                            <p className="font-semibold text-gray-800 text-sm">American Burger</p>
                            <p className="text-yellow-500 text-xs">★★★★★</p>
                            <p className="text-gray-700 text-sm font-bold">8.75</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
