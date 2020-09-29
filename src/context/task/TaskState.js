import React, {useReducer} from 'react'

import TaskContext from './TaskContext';
import TaskReducer from './TaskReducer';
import { PROJECT_TASKS, ADD_TASK, ERROR_TASK, DELETE_TASK, TASK_STATE, UPDATE_TASK, CURRENT_PROJECT, CURRENT_TASK, CLEAN_TASK } from '../../types'
import axiosClient from '../../config/axios';

const TaskState = props => {
    const initialState = {
        taskPerProject: [],
        taskError: false,
        selectedTask: null
    }

    //create dispatch and reducer
    const [state, dispatch] = useReducer(TaskReducer, initialState)

    //CREATE FN


    //GET PROJECTS TASKS
    const getTasksList = async project  => {
        try {
            const res = await axiosClient('/api/tasks', {params: {project}});
            dispatch({
                type: PROJECT_TASKS,
                payload: res.data.tasks 
            })
        } catch (error) {
            console.log(error)
        }
    }
    
//ADD TASK TO PROJECT
const addTask = async task => {
    try {
        const res = await axiosClient.post('/api/tasks', task);
        dispatch({
            type: ADD_TASK,
            payload: res.data.task
        });
    } catch (error) {
        console.log(error)
    }
}

const validateTask = () => {
    dispatch({
        type: ERROR_TASK
    })
}

//Delete tasks by id
const deleteTask = async (id, project) => {
    try {
        await axiosClient.delete(`/api/tasks/${id}`, {params: {project}});
        dispatch({
            type: DELETE_TASK,
            payload: id
        });
    } catch (error) {
        console.log(error);
    }
}

const updateTask = async task => {
console.log(task)
    try {
        const res = await axiosClient.put(`/api/tasks/${task._id}`, task);
        console.log(res)
        dispatch({
            type: UPDATE_TASK,
            payload: res.data.task
        })
    } catch (error) {
        console.log(error);
    }
}

    // Extrae una tarea para edición
    const setCurrentTask = task => {
        dispatch({
            type: CURRENT_TASK,
            payload: task
        })
    }

// //change task state
// const changeTaskState = task => {
//     dispatch({
//         type: TASK_STATE,
//         payload: task
//     });
// }

    const cleanTask = () => {
        dispatch({
            type: CLEAN_TASK
        })
    }

    return (
        <TaskContext.Provider
            value={{
                taskPerProject: state.taskPerProject,
                taskError: state.taskError,
                selectedTask: state.selectedTask,
                getTasksList,
                addTask,
                validateTask,
                deleteTask,
                setCurrentTask,
                cleanTask,
                updateTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
    );
}

 
export default TaskState;
 