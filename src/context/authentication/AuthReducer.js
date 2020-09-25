import { SUCESS_REGISTER, ERROR_REGISTER, GET_USER, SUCESS_LOGIN, ERROR_LOGIN, CLOSE_SESSION } from "../../types";


export default (state, action) => {
    switch (action.type) {
        case SUCESS_REGISTER:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authenticated: true,
                message: null
            }
            case GET_USER:
                return {
                    ...state,
                    user: action.payload
                }
        case ERROR_LOGIN:
        case ERROR_REGISTER:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                message: action.payload
            }
        default:
            return state;
    }
}