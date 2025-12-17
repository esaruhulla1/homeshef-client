import React, { useContext } from 'react';
// import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import Loading from '../components/shared/loading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation();

    if (loading) {
        return <div>
            <Loading></Loading>
        </div>
    }

    if (!user) {
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }

    return children;
};

export default PrivateRoute;