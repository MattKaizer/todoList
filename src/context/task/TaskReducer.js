
import { PROJECT_TASKS, ADD_TASK, ERROR_TASK, DELETE_TASK } from '../../types'

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
        default:
            return state;
    }
}