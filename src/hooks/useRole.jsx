import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { isLoading: roleLoading, data: role = 'user' } = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/email/${user.email}`);

            return res.data?.role || 'user';
        }
    })

    // console.log(role);
    

    return { role, roleLoading };
};

export default useRole;