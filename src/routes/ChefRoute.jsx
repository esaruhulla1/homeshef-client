import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import useRole from '../hooks/useRole';
import Loading from '../components/shared/loading';
import Forbidden from '../components/shared/Forbidden';

const ChefRoute = ({ children }) => {
    const { loading } = useContext(AuthContext);
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'chef') {
        return <Forbidden></Forbidden>
    }



    return children;
};

export default ChefRoute;