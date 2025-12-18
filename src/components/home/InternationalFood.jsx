import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

const leftVariant = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { staggerChildren: 0.2 }
    }
};

const rightVariant = {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { staggerChildren: 0.2 }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const InternationalFood = () => {
    return (
        <section className="bg-white py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">

                {/* Heading */}
                <motion.div
                    className="text-center mb-16"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl font-bold text-gray-800">
                        International Cuisines
                    </h2>
                    <p className="mt-3 text-gray-500">
                        Incredibly Tasty International Dish
                    </p>
                </motion.div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

                    {/* Left Side */}
                    <motion.div
                        className="space-y-12 text-center lg:text-right"
                        variants={leftVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {[
                            ["African Cuisines", "Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil expetelis in mei."],
                            ["American Cuisines", "Ultrices neque ornare aenean euismod elementum nisi quis. Ac turpis egestas maecenas."],
                            ["Asian Cuisines", "Molestie ac feugiat sed lectus. Eget mi proin sed libero enim."]
                        ].map(([title, desc], i) => (
                            <motion.div key={i} variants={item}>
                                <h3 className="text-red-500 font-semibold text-lg">
                                    {title}
                                </h3>
                                <p className="mt-2 text-gray-500 text-sm leading-relaxed">
                                    {desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Center Image */}
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <img
                            src="https://i.ibb.co.com/LzGc1Q6r/International-Food.png"
                            alt="International Dish"
                            className="w-72 lg:w-96"
                        />
                    </motion.div>

                    {/* Right Side */}
                    <motion.div
                        className="space-y-12 text-center lg:text-left"
                        variants={rightVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {[
                            ["European Cuisines", "Facilisis mauris sit amet massa vitae tortor condimentum."],
                            ["Oceanic Cuisines", "Cursus euismod quis viverra nibh cras pulvinar mattis nunc."],
                            ["Indian Cuisines", "Semper feugiat nibh sed pulvinar proin gravida hendrerit."]
                        ].map(([title, desc], i) => (
                            <motion.div key={i} variants={item}>
                                <h3 className="text-red-500 font-semibold text-lg">
                                    {title}
                                </h3>
                                <p className="mt-2 text-gray-500 text-sm leading-relaxed">
                                    {desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default InternationalFood;
