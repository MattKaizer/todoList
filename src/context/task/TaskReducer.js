
import { PROJECT_TASKS, ADD_TASK } from '../../types'

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
                    taskList: [...state.taskList, action.payload]
            }
        default:
            return state;
    }
}