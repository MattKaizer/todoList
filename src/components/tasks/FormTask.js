import React, { useContext, useState } from "react";

import ProjectContext from "../../context/projects/ProjectContext";
import TaskContext from '../../context/task/TaskContext';

const FormTask = () => {
  const projectContext = useContext(ProjectContext);
  //distructuring context
  const { project } = projectContext;

  const taskContext = useContext(TaskContext);
  const { taskError, addTask, selectedTask, validateTask, getTasksList, updateTask, cleanTask } = taskContext;

  //Form state
  const [task, setTask] = useState({
      name: ''
  });

  //distructuring state form
  const { name } = task;

  //IF NO PROJECT SELECTED
  if (!project) return null;
  const [currentProject] = project;

  //read input values
  const handleChange = e => {
      setTask({
          ...task,
          [e.target.name] : e.target.value
      })
  }

  const onSubmitHandler = e => {
    e.preventDefault();

    //validate
    if(name.trim() === '') {
        validateTask();
        return;
    }
    
    if (selectedTask === null) {
      task.project = currentProject._id;
      addTask(task);
    } else {
      updateTask(task);
      // clean selectedTask state
      cleanTask();
    }

    //get current project taks's
    getTasksList(currentProject.id);

    //reset form
    setTask({
        name: ''
    })

  };

  return (
    <div className="formulario">
      <form
        onSubmit={onSubmitHandler}
      >
        <div className="contendor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-inp">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value="Agregar Tarea"
          />
        </div>
      </form>
      {taskError ? <p className="mensaje error">EL nombre de la tarea es obligatorio</p> : null}
    </div>
  );
};

export default FormTask;
