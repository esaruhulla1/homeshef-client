import React, { useContext } from 'react';
import useRole from '../hooks/useRole';
import { AuthContext } from '../Context/AuthContext';
import Loading from '../components/shared/loading';
import Forbidden from '../components/shared/Forbidden';

const AdminRoute = ({ children }) => {
    const {loading } = useContext(AuthContext);
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'admin') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default AdminRoute;