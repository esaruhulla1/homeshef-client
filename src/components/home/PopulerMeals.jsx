import React from "react";

const products = [
    { id: 1, title: "Royale De Luxe", weight: "140 g", price: "$2.50", image: "https://compiled-production-assets.homechef.com/cdn-cgi/image/class=rounded-lg%20lazyload%20complete-opacity%20static,f=auto,q=75/assets/landing_pages/explore-the-menu/sweet-chili-pork-lettuce-wraps-b2253edf20e8fe0bc6f144836cd091448cf52193ba6c3b679cf365783277f2c8.jpg" },
    { id: 2, title: "Cheese Blast", weight: "150 g", price: "$3.10", image: "https://compiled-production-assets.homechef.com/cdn-cgi/image/class=rounded-lg%20lazyload%20complete-opacity%20static,f=auto,q=75/assets/landing_pages/explore-the-menu/tuscan-style-shrimp-penne-f23ce3b06e22d7f4cbf74588d9c8f28dab3bf8a3f83f6a2c9b68f158b06ed0d2.jpg" },
    { id: 3, title: "Spicy Grill", weight: "160 g", price: "$3.50", image: "https://compiled-production-assets.homechef.com/cdn-cgi/image/class=rounded-lg%20lazyload%20complete-opacity%20static,f=auto,q=75/assets/landing_pages/explore-the-menu/jalapeno-popper-chicken-2ca73501417fb943dd79673483290fa3f25ceefd12b05c2966a9c15abb1cd91d.jpg" },
    { id: 4, title: "BBQ Supreme", weight: "140 g", price: "$2.80", image: "https://compiled-production-assets.homechef.com/cdn-cgi/image/class=rounded-lg%20lazyload%20complete-opacity%20static,f=auto,q=75/assets/landing_pages/explore-the-menu/sirloin-steak-and-bacon-demi-e33ecae3c42addc7b0ee7b452d0b663241dde657805d9a7cdc16f499b175eb8e.jpg" },
    { id: 5, title: "Crunchy King", weight: "150 g", price: "$3.00", image: "https://compiled-production-assets.homechef.com/cdn-cgi/image/class=rounded-lg%20lazyload%20complete-opacity%20static,f=auto,q=75/assets/landing_pages/explore-the-menu/tuscan-style-shrimp-penne-f23ce3b06e22d7f4cbf74588d9c8f28dab3bf8a3f83f6a2c9b68f158b06ed0d2.jpg" },
    { id: 6, title: "Mega Beef", weight: "170 g", price: "$4.00", image: "https://compiled-production-assets.homechef.com/cdn-cgi/image/class=rounded-lg%20lazyload%20complete-opacity%20static,f=auto,q=75/assets/landing_pages/explore-the-menu/tuscan-style-shrimp-penne-f23ce3b06e22d7f4cbf74588d9c8f28dab3bf8a3f83f6a2c9b68f158b06ed0d2.jpg" },
    { id: 7, title: "Double Patty", weight: "180 g", price: "$4.20", image: "https://compiled-production-assets.homechef.com/cdn-cgi/image/class=rounded-lg%20lazyload%20complete-opacity%20static,f=auto,q=75/assets/landing_pages/explore-the-menu/jalapeno-popper-chicken-2ca73501417fb943dd79673483290fa3f25ceefd12b05c2966a9c15abb1cd91d.jpg" },
    { id: 8, title: "Classic Burger", weight: "140 g", price: "$2.40", image: "https://compiled-production-assets.homechef.com/cdn-cgi/image/class=rounded-lg%20lazyload%20complete-opacity%20static,f=auto,q=75/assets/landing_pages/explore-the-menu/sirloin-steak-and-bacon-demi-e33ecae3c42addc7b0ee7b452d0b663241dde657805d9a7cdc16f499b175eb8e.jpg" },
];

export default function PopulerMeals() {
    return (

        <div className="container mx-auto">
            <div className="w-full text-center py-10 font-inter">
                <p className="text-red-500 text-sm">Our Menu</p>
                <h1 className="text-3xl font-bold mt-2 mb-8 leading-snug">
                    Menu That Always Make You <br /> To Fall In Love
                </h1>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto">

                    {products.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition"
                        >
                            <img src={item.image} alt="burger" className="w-28 mx-auto mb-4" />

                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <p className="text-sm opacity-70">{item.weight}</p>
                            <p className="text-lg font-bold my-3">{item.price}</p>

                            <button className="bg-red-500 text-white px-6 py-2 rounded-xl mt-3 shadow">
                                Order Now
                            </button>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}
