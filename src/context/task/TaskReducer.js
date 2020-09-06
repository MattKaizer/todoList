
import { PROJECT_TASKS, ADD_TASK, ERROR_TASK } from '../../types'

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
                    taskList: [...state.taskList, action.payload],
                    taskError: false
            }
            case ERROR_TASK:
                return {
                    ...state,
                    taskError: true
            }
        default:
            return state;
    }
}