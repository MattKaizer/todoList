import React, { useReducer, useContext } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import axiosClient from '../../config/axios';

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
    const newRegisterUser = async data => {
        try {
            const res = await axiosClient.post('/api/users', data);
            console.log(res);
            dispatch({
                type: SUCESS_REGISTER
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: ERROR_REGISTER
            })
        }
    }
    
    return ( 
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                newRegisterUser
            }}
        >
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthState;