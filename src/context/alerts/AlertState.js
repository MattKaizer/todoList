import React, { useReducer } from 'react';
import AlertReducer from './AlertReducer';
import AlertContext from './AlertContext';

import { HIDE_ALERT, SHOW_ALERT } from "../../types";

const AlertState = props => {

    const initialState = {
        alert: null
    }

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    // fn's
    const showAlert = (msg, category) => {
        dispatch({
            type: SHOW_ALERT,
            payload: {
                msg,
                category
            } 
        })
    }

    setTimeout(() => {
        dispatch({
            type: HIDE_ALERT
        })
    }, 7000);

    return ( 
        <AlertContext.Provider
            value={{
                alert: state.alert,
                showAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
     );
}
 
export default AlertState;
