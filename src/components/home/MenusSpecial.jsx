import React from "react";
import { motion } from "framer-motion";

/* Variants */
const imageVariant = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 }
};

const contentVariant = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const itemVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const MenusSpecial = () => {
    return (
        <section className="bg-white py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Image */}
                    <motion.div
                        className="flex justify-center"
                        variants={imageVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <img
                            src="https://i.ibb.co.com/n807STRW/baked-chicken-wings-asian-style-tomatoes-sauce-plate.jpg"
                            alt="Menu Special"
                            className="w-full max-w-lg rounded-2xl shadow-lg"
                        />
                    </motion.div>

                    {/* Right Content */}
                    <motion.div
                        variants={contentVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {/* Heading */}
                        <motion.h2
                            variants={itemVariant}
                            className="text-4xl font-semibold text-gray-800 mb-12"
                        >
                            What Makes Our Menus Special ?
                        </motion.h2>

                        {/* Items */}
                        {[
                            ["🥕", "Pure Ingredients", "Vestibulum morbi blandit cursus risus at ultrices mi. Facilisis gravida neque convallis a."],
                            ["🍴", "Sustainability", "Laculis eu non diam phasellus. Dictum non consectetur a erat nam at."],
                            ["🍲", "Environmentalism", "Bibendum est ultricies integer quis auctor elit sed. Accumsan tortor posuere ac."],
                            ["📊", "Formula Transparency", "Facilisi nullam vehicula ipsum a. Ornare massa eget egestas purus viverra."]
                        ].map(([icon, title, desc], index) => (
                            <motion.div
                                key={index}
                                variants={itemVariant}
                                className="flex items-start gap-6 mb-10"
                            >
                                <span className="text-red-500 text-3xl">
                                    {icon}
                                </span>
                                <div>
                                    <h4 className="text-red-500 font-semibold text-lg">
                                        {title}
                                    </h4>
                                    <p className="mt-2 text-gray-500 text-sm leading-relaxed">
                                        {desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default MenusSpecial;
