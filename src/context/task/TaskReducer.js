
import { PROJECT_TASKS, ADD_TASK, ERROR_TASK, DELETE_TASK, TASK_STATE } from '../../types'

export default (state, action) => {
    switch (action.type) {
        case PROJECT_TASKS:
            return {
                ...state,
                taskPerProject: state.taskList.filter(task => task.projectId === action.payload)
            }
            case ADD_TASK:
                return {
                    ...state,
                    taskList: [action.payload, ...state.taskList],
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
                    taskList: state.taskList.filter( task => task.id !== action.payload)
            }
            case TASK_STATE:
                return {
                    ...state,
                    taskList: state.taskPerProject.map(task => task.id === action.payload.id ? action.payload : task)
            }
        default:
            return state;
    }
}