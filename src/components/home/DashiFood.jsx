import React from "react";
import { motion } from "framer-motion";

const images = [
    "https://i.ibb.co.com/GQRCDw0S/food-4.jpg",
    "https://i.ibb.co.com/3mVPgg2M/food-2.jpg",
    "https://i.ibb.co.com/rGZ5dwNk/food-3.jpg",
    "https://i.ibb.co.com/Jw12xsfz/photo-1546069901-ba9599a7e63c.jpg",
    "https://i.ibb.co.com/TBHxwFR4/foodd-5.jpg"
];

/* Variants */
const headingVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const containerVariant = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.2 }
    }
};

const imageVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
};

const PopularCollection = () => {
    return (
        <section className="bg-white py-20 overflow-hidden">
            <div className="container mx-auto px-4">

                {/* Heading */}
                <motion.div
                    className="text-center mb-14"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.h2
                        className="text-4xl font-semibold text-gray-800"
                        variants={headingVariant}
                        transition={{ duration: 0.6 }}
                    >
                        Popular Collection
                    </motion.h2>

                    <motion.p
                        className="mt-4 max-w-3xl mx-auto text-gray-500 text-sm leading-relaxed"
                        variants={headingVariant}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Lectus Proin Nibh Nisl Condimentum Id Venenatis A Condimentum Vitae.
                        Pellentesque Nec Nam Aliquam Sem Et Tortor.
                    </motion.p>
                </motion.div>

                {/* Image Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
                    variants={containerVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {images.map((src, index) => (
                        <motion.img
                            key={index}
                            src={src}
                            alt={`food-${index}`}
                            className="w-full h-80 object-cover rounded-xl shadow-md"
                            variants={imageVariant}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default PopularCollection;
