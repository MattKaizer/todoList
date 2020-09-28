import React, {useContext} from 'react';

import ProjectContext from '../../context/projects/ProjectContext';
import TaskContext from '../../context/task/TaskContext';


const Task = ({task}) => {

    const projectContext = useContext(ProjectContext);
    //distructuring context
    const { project } = projectContext;

    const taskContext = useContext(TaskContext);
    const { deleteTask, getTasksList, changeTaskState } = taskContext;

    //delete fn
    const deleteHanlder = id => {
        deleteTask(id);
        getTasksList(project[0].id);
    }

    //FN change task state
    const changeState = task => {
        if (task.taskState) {
            task.taskState = false
        } else {
            task.taskState = true
        }
        changeTaskState(task);
    }

    return ( 
        <li className="tarea sombra">
            <p>{task.name}</p>
            <div className="estado">
               {task.taskState ?
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
                    onClick={() => deleteHanlder(task.id)}
                >
                    Eliminar
                </button>
            </div>
        </li>
     );
}
 
export default Task;