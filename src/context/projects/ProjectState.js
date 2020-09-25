import React, { useReducer } from 'react';
// import { v4 as uuidv4 } from "uuid";

import ProjectContext from './ProjectContext';
import ProjectReducer from './ProjectReducer';
import { PROJECT_FORM, GET_PROJECTS, ADD_PROJECT, SHOW_ERROR, CURRENT_PROJECT, REMOVE_PROJECT } from '../../types';
import axiosClient from '../../config/axios';

const ProjectState = props => {
    const projectList = [
        {id: 1, projectName: 'Ecommerce'},
        {id:2, projectName: 'Intranet'},
        {id: 3, projectName: 'Web Design'},
        {id: 4, projectName: 'Docker'}
    ]
    const initialState = {
        //Provisional List
        projectList: [],
        newProject: false,
        errorForm: false,
        project: null
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
    const getProjectList = () => {
        dispatch({
            type: GET_PROJECTS,
            payload: projectList
        })
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
            console.log(project);
            const res = await axiosClient.post('/api/projects', project);
            // console.log(res);
            dispatch({
                type: ADD_PROJECT,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    //SHOW ERROR
    const showError = () => {
        dispatch({
            type: SHOW_ERROR,
        })
    }

    //remove project
    const removeProject = projectId => {
        dispatch({
            type: REMOVE_PROJECT,
            payload: projectId
        })
    }

    return (
        <ProjectContext.Provider
            value= {{
                projectList: state.projectList,
                newProject: state.newProject,
                errorForm: state.errorForm,
                project: state.project,
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