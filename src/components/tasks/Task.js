import React, {useContext} from 'react';

import ProjectContext from '../../context/projects/ProjectContext';
import TaskContext from '../../context/task/TaskContext';


const Task = ({task}) => {

    const projectContext = useContext(ProjectContext);
    //distructuring context
    const { project } = projectContext;

    const taskContext = useContext(TaskContext);
    const { deleteTask, getTasksList, updateTask } = taskContext;

    const [currentProject] = project;

    //delete fn
    const deleteHanlder = id => {
        deleteTask(id, currentProject._id);
        getTasksList(currentProject._id);
    }

    //FN change task state
    const changeState = task => {
        if (task.state) {
            task.state = false
        } else {
            task.state = true
        }
        updateTask(task);
    }

    return ( 
        <li className="tarea sombra">
            <p>{task.name}</p>
            <div className="estado">
               {task.state ?
                    (
                        <button 
                        type="button"
                        className="completo"
                        onClick={() => changeState(task)}
                        >
                        Completo
                        </button>
                    )
                :
                    (
                        <button 
                        type="button"
                        className="incompleto"
                        onClick={() => changeState(task)}
                        >
                        Incompleto
                        </button>
                    )

               } 
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => deleteHanlder(task._id)}
                >
                    Eliminar
                </button>
            </div>
        </li>
     );
}
 
export default Task;