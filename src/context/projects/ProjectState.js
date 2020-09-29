import React, { useReducer } from 'react';
// import { v4 as uuidv4 } from "uuid";

import ProjectContext from './ProjectContext';
import ProjectReducer from './ProjectReducer';
import { PROJECT_FORM, GET_PROJECTS, ADD_PROJECT, SHOW_ERROR, CURRENT_PROJECT, REMOVE_PROJECT, ERROR_PROJECT } from '../../types';
import axiosClient from '../../config/axios';

const ProjectState = props => {

    const initialState = {
        projectList: [],
        newProject: false,
        errorForm: false,
        project: null,
        message: null
    }


    //Dispatch foR actions
    const [state, dispatch] = useReducer(ProjectReducer, initialState);

    //crud functions
    const showForm = () => {
        dispatch({
            type: PROJECT_FORM
        })
    }

    //get Projects
    const getProjectList = async () => {
        try {
            const res = await axiosClient.get('/api/projects');
            dispatch({
                type: GET_PROJECTS,
                payload: res.data.projects
            })
        } catch (error) {
            const alert = {
                msg: 'Hubo un error',
                category: 'alert-error'
            }
           dispatch({
               type:ERROR_PROJECT,
               payload: alert
           });
        }
    }

    //select project
    const currentProject = projectId => {
        dispatch({
            type: CURRENT_PROJECT,
            payload: projectId
        })
    }

    //add project
    const addProject = async project =>{
        //ADD ID WHEN RECEIVE OBJECT FROM NEWPROJECT & THEN ADD THE PROJECT
        // project.id = uuidv4;
        try {
            const res = await axiosClient.post('/api/projects', project);
            // console.log(res);
            dispatch({
                type: ADD_PROJECT,
                payload: res.data.project
            })
        } catch (error) {
            const alert = {
                msg: 'Hubo un error',
                category: 'alert-error'
            }
           dispatch({
               type:ERROR_PROJECT,
               payload: alert
           });
        }
    }

    //SHOW ERROR
    const showError = () => {
        dispatch({
            type: SHOW_ERROR,
        })
    }

    //remove project
    const removeProject = async projectId => {
        try {
            await axiosClient.delete(`/api/projects/${projectId}`);
            dispatch({
                type: REMOVE_PROJECT,
                payload: projectId
            });
        } catch (error) {
            const alert = {
                msg: 'Hubo un error',
                category: 'alert-error'
            }
           dispatch({
               type:ERROR_PROJECT,
               payload: alert
           });
        }
    }

    return (
        <ProjectContext.Provider
            value= {{
                projectList: state.projectList,
                newProject: state.newProject,
                errorForm: state.errorForm,
                project: state.project,
                message: state.message,
                showForm,
                getProjectList,
                addProject,
                showError,
                currentProject,
                removeProject
            }}
        >
            {props.children}
        </ProjectContext.Provider>
    );
}

export default ProjectState;