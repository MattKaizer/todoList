import React, { useContext }  from 'react'

import ProjectContext from '../../context/projects/ProjectContext';
import TaskContext from '../../context/task/TaskContext';

const Project = ({project}) => {

    const projectContext = useContext(ProjectContext);
    const { currentProject } = projectContext;

    const taskContext = useContext(TaskContext);
    const { getTasksList } = taskContext;
 
    //ADD CURRENT PROJECT
    const selectProject = id => {
        currentProject(id); //selecting project
        getTasksList(id); //filter tasks per project

    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => selectProject(project.id)}
            >
            {project.projectName}
            </button>
        </li>
     );
}
 
export default Project;