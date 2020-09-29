import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import axiosClient from '../../config/axios';

import { SUCESS_REGISTER, ERROR_REGISTER, GET_USER, SUCESS_LOGIN, ERROR_LOGIN, CLOSE_SESSION } from "../../types";
import tokenAuth from '../../config/tokenAuth';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        message: null,
        loading: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // fn's
    // user registration
    const newRegisterUser = async data => {
        try {
            const res = await axiosClient.post('/api/users', data);
            // console.log(res.data);
            dispatch({
                type: SUCESS_REGISTER,
                payload: res.data
            });
            // get user when authenticated
            authenticatedUser();
        } catch (error) {
            // console.log(error.response.data.msg);
            const alert = {
                msg: error.response.data.msg,
                category: 'alert-error'
            }
            dispatch({
                type: ERROR_REGISTER,
                payload: alert
            })
        }
    }

    // return authenticated user
    const authenticatedUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            // TODO: fn to send token to headers as x-auth-token
            tokenAuth(token);
        }
    
        try {
            const res = await axiosClient.get('/api/auth');
            // console.log(res.data.user);
            dispatch({
                type: GET_USER,
                payload: res.data.user
            });
        } catch (error) {
            dispatch({
                type: ERROR_LOGIN
            })
        }
    }

    // user login
    const initSession = async data => {
        try {
            const res = await axiosClient.post('/api/auth', data);
            // console.log(res);
            dispatch({
                type: SUCESS_LOGIN,
                payload: res.data
            });
            // get user when authenticated
            authenticatedUser();
        } catch (error) {
            // console.log(error.response.data.msg);
            const alert = {
                msg: error.response.data.msg,
                category: 'alert-error'
            }
            dispatch({
                type: ERROR_LOGIN,
                payload: alert
            })            
        }
    }

    // logout
    const logout = () => {
        dispatch({
            type: CLOSE_SESSION
        });
    }
    
    return ( 
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                loading: state.loading,
                newRegisterUser,
                authenticatedUser,
                initSession,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthState;