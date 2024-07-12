import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
// import PropTypes from 'prop-types';


export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);


   useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('user')));
        console.log(user);
   },[])


    const authInfo = {
        user,
        setUser, 
        // login
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;