import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Context/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CreateMeal = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

    const { register, handleSubmit, reset } = useForm();

    // 🔥 TanStack Mutation
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (mealData) => {
            const res = await axiosSecure.post("/meals", mealData);
            return res.data;
        }
    });

    // 🟢 Submit Handler
    const onSubmit = async (data) => {
        try {
            // 1️⃣ Image Upload (CORRECT WAY)
            const formData = new FormData();
            formData.append("image", data.foodImage[0]);

            const imgRes = await fetch(image_API_URL, {
                method: "POST",
                body: formData
            });

            const imgData = await imgRes.json();

            if (!imgData.success) {
                toast.error("Image upload failed");
                return;
            }

            // 2️⃣ Meal Object
            const mealInfo = {
                foodName: data.foodName,
                chefName: data.chefName,
                foodImage: imgData.data.display_url,
                price: parseFloat(data.price),
                rating: 0,
                ingredients: data.ingredients.split(",").map(i => i.trim()),
                estimatedDeliveryTime: data.estimatedDeliveryTime,
                chefExperience: data.chefExperience,
                chefId: data.chefId,
                userEmail: user.email,
                delivery_Area: data.delivery_Area
            };

            // 3️⃣ Save Meal
            await mutateAsync(mealInfo);

            toast.success("Meal added successfully 🍽️");
            reset();

        } catch (error) {
            console.error("Create Meal Error:", error);
            toast.error("Something went wrong");
        }
    };


    return (
        <div className="max-w-4xl mx-auto p-6 bg-base-100 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-6">Create New Meal</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
                <input {...register("foodName", { required: true })} placeholder="Food Name" className="input input-bordered" />

                <input {...register("chefName", { required: true })} placeholder="Chef Name" className="input input-bordered" />

                <input type="file" {...register("foodImage", { required: true })} className="file-input file-input-bordered" />

                <input {...register("price", { required: true })} type="number" step="0.01" placeholder="Price" className="input input-bordered" />

                <input {...register("estimatedDeliveryTime")} placeholder="Estimated Delivery Time" className="input input-bordered" />

                <input {...register("chefExperience")} placeholder="Chef Experience" className="input input-bordered" />

                <input {...register("chefId", { required: true })} placeholder="Chef ID" className="input input-bordered" />

                <input value={user?.email} readOnly className="input input-bordered bg-gray-100" />

                <input {...register("delivery_Area")} placeholder="Delivery Area" className="input input-bordered" />

                <textarea
                    {...register("ingredients", { required: true })}
                    placeholder="Ingredients (comma separated)"
                    className="textarea textarea-bordered col-span-1 md:col-span-2"
                />

                <button
                    disabled={isPending}
                    className="btn btn-primary border-0 rounded-xl bg-[#00c951] col-span-1 md:col-span-2"
                >
                    {isPending ? "Adding..." : "Create Meal"}
                </button>

            </form>
        </div>
    );
};

export default CreateMeal;
