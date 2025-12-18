import React from "react";
import { FaPlay, FaShoppingCart, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function Banner() {
    return (
        <section className="w-full py-20 bg-[#fef5f5] overflow-hidden">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center px-6">

                {/* LEFT CONTENT */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.15,
                            },
                        },
                    }}
                    className="space-y-8"
                >
                    {/* Badge */}
                    <motion.div
                        variants={{
                            hidden: { y: 20, opacity: 0 },
                            visible: { y: 0, opacity: 1 },
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 bg-red-50 px-4 py-1.5 rounded-full text-sm font-medium text-red-600 w-fit"
                    >
                        More than Faster <FaPlay className="text-xs" />
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        variants={{
                            hidden: { y: 30, opacity: 0 },
                            visible: { y: 0, opacity: 1 },
                        }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="text-5xl font-extrabold leading-tight text-gray-900"
                    >
                        Be The Fastest
                        <br /> In Delivering Your{" "}
                        <span className="text-red-500">Food</span>
                    </motion.h1>

                    {/* Paragraph */}
                    <motion.p
                        variants={{
                            hidden: { y: 20, opacity: 0 },
                            visible: { y: 0, opacity: 1 },
                        }}
                        transition={{ duration: 0.6 }}
                        className="text-gray-500 max-w-md"
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nunc vulputate libero et velit interdum.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        variants={{
                            hidden: { y: 20, opacity: 0 },
                            visible: { y: 0, opacity: 1 },
                        }}
                        transition={{ duration: 0.6 }}
                        className="flex gap-4 pt-20"
                    >

                        <motion.a
                            href="/meals"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-red-600 transition"
                        >
                            Order Now
                        </motion.a>

                        <motion.a
                            href="/meals"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white border border-[#70ab44] px-6 py-3 rounded-full text-lg font-semibold shadow hover:shadow-md transition flex items-center gap-2"
                        >
                            <FaPlay className="text-red-500" /> Order Process
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* RIGHT IMAGE SECTION */}
                <div className="relative justify-center pr-0 lg:pr-20 hidden lg:flex">

                    {/* Chef Image */}
                    <motion.img
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        src="/banner_chef.png"
                        alt="woman holding salad"
                        className="w-[75%] xl:w-[50%] z-10"
                    />

                    {/* Background Shape */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute bottom-0 w-95 h-72 bg-red-500 rounded-3xl rounded-tl-none z-0"
                        style={{
                            clipPath: "polygon(0 0, 100% 10%, 100% 100%, 0% 100%)",
                        }}
                    />


                    {/* Fresh Orange Card */}
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="absolute -top-6 right-4 bg-white shadow-lg rounded-xl p-4 w-40 text-center"
                    >
                        <img src="/banner_Burger.jpg" className="w-16 mx-auto" />
                        <h4 className="font-semibold text-sm">Fresh Orange</h4>
                        <p className="font-bold">$44.60</p>
                        <p className="text-xs text-gray-400">Free Shipping</p>
                        <button className="mt-2 bg-red-500 w-full py-2 rounded-lg text-white flex justify-center">
                            <FaShoppingCart />
                        </button>
                    </motion.div>

                    {/* Delivery Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="hidden xl:flex absolute top-100 right-4 bg-white shadow-md rounded-xl p-3 gap-3 w-36"
                    >
                        <FaClock className="text-green-500 text-xl" />
                        <div>
                            <p className="font-semibold text-sm">Delivery</p>
                            <p className="text-xs text-gray-400">30 Min</p>
                        </div>
                    </motion.div>

                    {/* Burger Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="hidden xl:flex absolute bottom-6 -left-25 bg-white shadow-md rounded-xl p-3 w-48 gap-3 items-center"
                    >
                        <img src="/banner_Burger.jpg" className="w-12 h-12 rounded-md" />
                        <div>
                            <p className="font-semibold text-sm">American Burger</p>
                            <p className="text-yellow-500 text-xs">★★★★★</p>
                            <p className="font-bold">8.75</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
