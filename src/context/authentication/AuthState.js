import React, { useReducer, useContext } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';

import { SUCESS_REGISTER, ERROR_REGISTER, GET_USER, SUCESS_LOGIN, ERROR_LOGIN, CLOSE_SESSION } from "../../types";

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        message: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // fn's
    
    return ( 
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message
            }}
        >
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthState;