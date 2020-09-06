import React, { useContext, useState } from "react";

import ProjectContext from "../../context/projects/ProjectContext";
import TaskContext from '../../context/task/TaskContext';

const FormTask = () => {
  const projectContext = useContext(ProjectContext);
  //distructuring context
  const { project } = projectContext;

  const taskContext = useContext(TaskContext);
  const { addTask } = taskContext;

  //Form state
  const [task, setTask] = useState({
      taskName: ''
  });

  //distructuring state form
  const { taskName } = task;

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

  const onSubmitHandler = (e) => {
    e.preventDefault();
    
    task.projectId = currentProject.id;
    task.taskState = false
    addTask();

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
            name={taskName}
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
    </div>
  );
};

export default FormTask;
