
import { PROJECT_TASKS, ADD_TASK, ERROR_TASK, DELETE_TASK, TASK_STATE, UPDATE_TASK, CURRENT_TASK } from '../../types'

export default (state, action) => {
    switch (action.type) {
        case PROJECT_TASKS:
            return {
                ...state,
                taskPerProject: action.payload
            }
            case ADD_TASK:
                return {
                    ...state,
                    taskPerProject: [action.payload, ...state.taskPerProject],
                    taskError: false
            }
            case ERROR_TASK:
                return {
                    ...state,
                    taskError: true
            }
            case DELETE_TASK:
                return {
                    ...state,
                    taskPerProject: state.taskPerProject.filter( task => task.id !== action.payload)
            }
            // case UPDATE_TASK:
            //     return {
            //         ...state,
            //         taskPerProject: state.taskPerProject.map(task => task._id === action.payload._id ? action.payload : task )
            //     }
            case UPDATE_TASK:
            case TASK_STATE:
                return {
                    ...state,
                    taskPerProject: state.taskPerProject.map(task => task.id === action.payload.id ? action.payload : task)
            }
            case CURRENT_TASK:
                return {
                    ...state,
                    selectedTask: action.payload
                }
        default:
            return state;
    }
}