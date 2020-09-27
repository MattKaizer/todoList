import { PROJECT_FORM, GET_PROJECTS, ADD_PROJECT, SHOW_ERROR, CURRENT_PROJECT, REMOVE_PROJECT, ERROR_PROJECT } from '../../types';

export default (state, action) => {
    switch(action.type) {
        case PROJECT_FORM:
            return {
                ...state,
                newProject: true
            }
        case GET_PROJECTS:
            return {
                ...state,
                projectList: action.payload
            }
        case ADD_PROJECT:
            return {
                ...state,
                projectList: [...state.projectList, action.payload],
                newProject: false,
                errorForm: false
            }
        case SHOW_ERROR:
            return {
                ...state,
                errorForm: true
            }
        case CURRENT_PROJECT:
            return {
                ...state,
                project: state.projectList.filter(project => project._id  === action.payload)
            }
        case REMOVE_PROJECT:
            return {
                ...state,
                projectList: state.projectList.filter(project => project._id  !== action.payload),
                project: null
            }
        case ERROR_PROJECT:
            return {
                ...state,
                message: action.payload 
            }
        default:
            return state;
    }

}