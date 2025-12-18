import React from 'react';

const services = [
    {
        title: "Home-Cooked Meals",
        description: "Enjoy fresh and delicious home-cooked meals prepared by local chefs.",
        icon: "🍲"
    },
    {
        title: "Fast Delivery",
        description: "Get your meals delivered quickly and safely to your doorstep.",
        icon: "🚚"
    },
    {
        title: "Custom Menus",
        description: "Choose from a variety of dishes and customize your meals to your taste.",
        icon: "📝"
    }
];

const Service = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Services</h2>

                <div className="grid gap-8 md:grid-cols-3">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="text-5xl mb-4">{service.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Service;
