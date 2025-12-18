import React from "react";
import { motion } from "framer-motion";
import { FaClipboardList, FaMotorcycle, FaUtensils } from "react-icons/fa";

const services = [
    {
        title: "Easy To Order",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        icon: <FaClipboardList size={40} className="text-red-500" />,
    },
    {
        title: "Fastest Delivery",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        icon: <FaMotorcycle size={40} className="text-red-500" />,
    },
    {
        title: "Best Quality",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        icon: <FaUtensils size={40} className="text-red-500" />,
    },
];

/* Variants */
const headingVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
};

const Services = () => {
    return (
        <section className="w-full bfg-[#fef5f5] py-20 overflow-hidden">

            {/* Heading */}
            <motion.div
                className="text-center mb-12"
                variants={headingVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <p className="text-red-500 font-medium mb-2">What we Serve</p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Your Favorite Food <br /> Delivery Partner
                </h2>
            </motion.div>

            {/* Cards */}
            <motion.div
                className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6"
                variants={containerVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariant}
                        whileHover={{ y: -8, scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="bg-white w-[70%] mx-auto rounded-xl shadow-md hover:shadow-xl py-20 flex flex-col items-center text-center cursor-pointer"
                    >
                        <motion.div
                            initial={{ scale: 0.7, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            className="mb-4"
                        >
                            {service.icon}
                        </motion.div>

                        <h3 className="text-xl font-semibold mb-2">
                            {service.title}
                        </h3>
                        <p className="text-gray-500">
                            {service.description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Services;
