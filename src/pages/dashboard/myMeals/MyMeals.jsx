import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyMeals = () => {
        const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    return (
        <div className='max-w-6xl mx-auto'>
            MyMeals
        </div>
    );
};

export default MyMeals;