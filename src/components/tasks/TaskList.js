import React, { Fragment, useContext } from 'react'
import Task from './Task';

import ProjectContext from '../../context/projects/ProjectContext';
import TaskContext from '../../context/task/TaskContext';

const TaskList = () => {

    const projectContext = useContext(ProjectContext);
    //distructuring context
    const { project, removeProject } = projectContext;

    const taskContext = useContext(TaskContext);
    const { taskPerProject } = taskContext;

    //IF NO PROJECT SELECTED
    if(!project) return <h1>Selecciona un Proyecto</h1>
    const [currentProject] = project;

    return ( 
        <Fragment>
            <h2>Proyecto: {currentProject.projectName}</h2>
            <ul className="listado-tareas">
                {taskPerProject.length === 0
                    ? (<li className="tareas"><p>No hay tareas</p></li>)
                    : taskPerProject.map(task => (
                        <Task key={task.id} task={task}/>
                    ))
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={() => {removeProject(currentProject.id)}}
            >
                Eliminar Proyecto &times;
            </button>
        </Fragment>
    );
}
 
export default TaskList;