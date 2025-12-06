import React from "react";
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

const Services = () => {
    return (
        <section className="w-full bg-pink-50 py-20">
            <div className="text-center mb-12">
                <p className="text-red-500 font-medium mb-2">What we Serve</p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Your Favorite Food <br /> Delivery Partner
                </h2>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 ">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="bg-white w-[70%] mx-auto rounded-lg shadow-md hover:shadow-xl transition-shadow  py-20 flex flex-col items-center text-center"
                    >
                        <div className="mb-4">{service.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                        <p className="text-gray-500">{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;
