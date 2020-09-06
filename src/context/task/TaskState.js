import React, {useReducer} from 'react'

import TaskContext from './TaskContext';
import TaskReducer from './TaskReducer';
import { PROJECT_TASKS, ADD_TASK, ERROR_TASK } from '../../types'

const TaskState = props => {
    const initialState = {
        taskList: [
            {taskName: 'Elegir plataforma', taskState: false, projectId: 1},
            {taskName: 'Elegir Colores', taskState: false, projectId: 2},
            {taskName: 'Elegir Pasarela de pago', taskState: false, projectId: 3},
            {taskName: 'Elegir Hosting', taskState: true, projectId: 4},
            {taskName: 'Elegir Colores', taskState: false, projectId: 3},
            {taskName: 'Elegir Pasarela de pago', taskState: false, projectId: 4},
            {taskName: 'Elegir Hosting', taskState: true, projectId: 1},

        ],
        taskPerProject: null,
        taskError: false
    }

    //create dispatch and reducer
    const [state, dispatch] = useReducer(TaskReducer, initialState)

    //CREATE FN


    //GET PROJECTS TASKS
    const getTasksList = projectId => {
        dispatch({
            type: PROJECT_TASKS,
            payload: projectId
        })
    }
    
//ADD TASK TO PROJECT
const addTask = task => {
    dispatch({
        type: ADD_TASK,
        payload: task
    })
}

const validateTask = () => {
    dispatch({
        type: ERROR_TASK
    })
}

    return (
        <TaskContext.Provider
            value={{
                taskPerProject: state.taskPerProject,
                taskList: state.taskList,
                taskError: state.taskError,
                getTasksList,
                addTask,
                validateTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
    );
}

 
export default TaskState;
 