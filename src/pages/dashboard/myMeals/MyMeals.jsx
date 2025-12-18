import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../../../components/shared/loading';

const MyMeals = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const [meals, setMeals] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        foodName: '',
        foodImage: '',
        price: '',
        rating: '',
        ingredients: [],
        estimatedDeliveryTime: '',
        chefName: '',
        chefId: ''
    });

    // 🔹 Fetch meals created by logged-in chef
    const fetchMeals = async () => {
        try {
            const res = await axiosSecure.get(`/my-meals/${user.email}`);
            setMeals(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (user?.email) fetchMeals();
    }, [user]);

    // 🔹 Delete meal
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this meal!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/meals/${id}`);
                    Swal.fire('Deleted!', 'Your meal has been deleted.', 'success');
                    fetchMeals();
                } catch (err) {
                    Swal.fire('Error', 'Failed to delete meal', 'error');
                }
            }
        });
    };

    // 🔹 Open update modal
    const handleUpdateClick = (meal) => {
        setSelectedMeal(meal);
        setFormData({
            foodName: meal.foodName,
            foodImage: meal.foodImage,
            price: meal.price,
            rating: meal.rating,
            ingredients: meal.ingredients.join(', '),
            estimatedDeliveryTime: meal.estimatedDeliveryTime,
            chefName: meal.chefName,
            chefId: meal.chefId
        });
        setShowModal(true);
    };

    // 🔹 Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 🔹 Submit update
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedMeal = {
                ...formData,
                ingredients: formData.ingredients.split(',').map(i => i.trim())
            };
            await axiosSecure.put(`/meals/${selectedMeal._id}`, updatedMeal);
            Swal.fire('Updated!', 'Meal updated successfully.', 'success');
            setShowModal(false);
            fetchMeals();
        } catch (err) {
            Swal.fire('Error', 'Failed to update meal', 'error');
        }
    };

        if (loading) {
        return <div className="text-center py-20 text-xl"><Loading></Loading></div>;
    }

    return (
        <div className='max-w-7xl mx-auto p-4'>
            <h2 className='text-2xl font-bold mb-4'>My Meals</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {meals.map(meal => (
                    <div key={meal._id} className=' rounded-lg shadow p-4 flex flex-col'>
                        <img src={meal.foodImage} alt={meal.foodName} className='w-full h-48 object-cover rounded' />
                        <h3 className='text-xl font-semibold mt-2'>{meal.foodName}</h3>
                        <p><strong>Price:</strong> ${meal.price}</p>
                        <p><strong>Rating:</strong> {meal.rating}</p>
                        <p><strong>Ingredients:</strong> {meal.ingredients.join(', ')}</p>
                        <p><strong>Delivery Time:</strong> {meal.estimatedDeliveryTime} mins</p>
                        <p><strong>Chef:</strong> {meal.chefName} (ID: {meal.chefId})</p>
                        <div className='mt-4 flex gap-2'>
                            <button
                                className='bg-red-500 text-white px-3 py-1 rounded'
                                onClick={() => handleDelete(meal._id)}
                            >
                                Delete
                            </button>
                            <button
                                className='bg-green-500 text-white px-3 py-1 rounded'
                                onClick={() => handleUpdateClick(meal)}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* 🔹 Update Modal */}
            {showModal && (
                <div className='fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50'>
                    <div className='bg-white p-6 rounded w-full max-w-md'>
                        <h3 className='text-xl font-bold mb-4'>Update Meal</h3>
                        <form onSubmit={handleUpdateSubmit} className='flex flex-col gap-3'>

                            <div className='flex flex-col'>
                                <label htmlFor='foodName' className='mb-1 font-semibold'>Food Name</label>
                                <input
                                    type='text'
                                    id='foodName'
                                    name='foodName'
                                    value={formData.foodName}
                                    onChange={handleChange}
                                    className='border px-2 py-1 rounded'
                                    required
                                />
                            </div>

                            {/* <div className='flex flex-col'>
                                <label htmlFor='foodImage' className='mb-1 font-semibold'>Image URL</label>
                                <input
                                    type='text'
                                    id='foodImage'
                                    name='foodImage'
                                    value={formData.foodImage}
                                    onChange={handleChange}
                                    className='border px-2 py-1 rounded'
                                    required
                                />
                            </div> */}

                            <div className='flex flex-col'>
                                <label htmlFor='price' className='mb-1 font-semibold'>Price</label>
                                <input
                                    type='number'
                                    id='price'
                                    name='price'
                                    value={formData.price}
                                    onChange={handleChange}
                                    className='border px-2 py-1 rounded'
                                    required
                                />
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor='ingredients' className='mb-1 font-semibold'>Ingredients (comma separated)</label>
                                <input
                                    type='text'
                                    id='ingredients'
                                    name='ingredients'
                                    value={formData.ingredients}
                                    onChange={handleChange}
                                    className='border px-2 py-1 rounded'
                                    required
                                />
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor='estimatedDeliveryTime' className='mb-1 font-semibold'>Estimated Delivery Time (mins)</label>
                                <input
                                    type='text'
                                    id='estimatedDeliveryTime'
                                    name='estimatedDeliveryTime'
                                    value={formData.estimatedDeliveryTime}
                                    onChange={handleChange}
                                    className='border px-2 py-1 rounded'
                                    required
                                />
                            </div>

                            <div className='flex justify-end gap-2 mt-4'>
                                <button
                                    type='button'
                                    className='bg-gray-400 text-white px-3 py-1 rounded'
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className='bg-green-500 text-white px-3 py-1 rounded'
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyMeals;
