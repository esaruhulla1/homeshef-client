import React from "react";

const About = () => {
  return (
    <div className="container mx-auto">
      {/* OUR STORY */}
      <section className="py-20 px-6">
        <h2 className="text-4xl font-bold mb-6">Our Story</h2>
        <p className="text-lg leading-8">
          HomeShef started with one simple idea — to connect passionate home cooks
          with people looking for fresh, homemade meals. What began as a small community of
          home chefs has grown into a trusted marketplace where customers can explore daily menus,
          place orders, and enjoy homemade food delivered to their doorstep.
          <br /><br />
          We believe that homemade food has the power to bring communities together. Each meal
          is prepared with love, care, and local ingredients. Our platform ensures transparency,
          quality, and safety for both chefs and customers.
          <br /><br />
          <span className="font-bold">👩‍🍳 Empowering Home Chefs:</span> Our platform allows chefs to earn
          from their skills without needing a physical restaurant.
          <br />
          <span className="font-bold">🍲 Healthy Homemade Meals:</span> Customers get access to fresh, affordable,
          and nutritious meals prepared with care.
          <br />
          <span className="font-bold">📦 Fast & Reliable Delivery:</span> Real-time order tracking ensures
          meals reach you safely and on time.
        </p>
      </section>

      {/* OUR MISSION */}
      <section className="py-20 px-6">
        <h2 className="text-4xl font-bold mb-8 text-center">Our Mission</h2>
        <div className="space-y-12">

          <div>
            <h3 className="text-2xl font-semibold mb-2">Support Local Chefs</h3>
            <p className="leading-7">
              We empower talented home cooks to monetize their culinary skills without the overhead of
              a restaurant. Our platform provides tools, visibility, and support to help them grow.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2">Fresh & Healthy Meals</h3>
            <p className="leading-7">
              Customers get access to meals made with fresh, local ingredients. Every dish is crafted
              to ensure taste, health, and authenticity.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2">Secure & Easy Ordering</h3>
            <p className="leading-7">
              Our platform provides a seamless ordering experience with secure payments, real-time
              tracking, and transparent communication between chefs and customers.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2">Community Driven</h3>
            <p className="leading-7">
              Ratings, reviews, and recommendations create trust and ensure high-quality meals
              while fostering a strong local food community.
            </p>
          </div>

        </div>
      </section>

      {/* STATS */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-12">Our Impact</h2>
        <div className="flex flex-col sm:flex-row justify-around gap-12">
          <div>
            <p className="text-5xl font-bold">1K+</p>
            <p className="mt-2">Home Chefs</p>
          </div>
          <div>
            <p className="text-5xl font-bold">10K+</p>
            <p className="mt-2">Meals Delivered</p>
          </div>
          <div>
            <p className="text-5xl font-bold">100%</p>
            <p className="mt-2">Customer Satisfaction</p>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
        <p className="text-gray-400 mb-6">
          Whether you’re a home chef or a food lover, we’re here to bring the best homemade meals
          right to your table. Connect with us and become part of our growing community!
        </p>

        <a
          href="#"
          className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
        >
          Get Started
        </a>
      </section>
    </div>
  );
};

export default About;
