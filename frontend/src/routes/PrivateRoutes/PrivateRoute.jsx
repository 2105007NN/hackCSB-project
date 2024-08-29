/* eslint-disable react/prop-types */
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { useContext } from 'react';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    console.log("inside private route");
    if(loading){
        return <progress className="progress w-56"></progress>
    }

    if (user){
        return children;
    }

    return <Navigate to="/auth/login" state={{from: location}} replace></Navigate>;
};

export default PrivateRoute;