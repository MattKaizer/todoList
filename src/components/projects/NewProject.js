import React, { Fragment, useState, useContext } from 'react';

import ProjectContext from '../../context/projects/ProjectContext';

const NewProject = () => {
    //state form
    const projectContext = useContext(ProjectContext);
    const { errorForm, newProject, showForm, addProject, showError } = projectContext;

    //state
    const [project, setProject] = useState({
        projectName: ''
    });

    //distructuring project name
    const { projectName } = project;

    const onChangeProject = e => {
        setProject({
            ...project,
            [e.target.name] : e.target.value
        })
    }

    //SUBMIT FORM
    const onSubmitHandler = e => {
        e.preventDefault();
        if(projectName === '') {
            showError(); 
            return;
        }
        //ADD TO STATE
        addProject(project);
        //clean form
        setProject({
            projectName: ''
        })
    }

    //SHOW FORM
    const onClickForm = e => {
        showForm();
    }

    return ( 
        <Fragment>
            <button 
                type="button"
                className="btn btn-block btn-primario"
                onClick={ onClickForm }
            >Nuevo Proyecto</button>
            {
                newProject ?
                <form
                className="formulario-nuevo-proyecto"
                onSubmit={onSubmitHandler}
            >
                <input 
                    type="text"
                    className="input-text"
                    placeholder="Nombre Proyecto"
                    name="projectName"
                    value={projectName}
                    onChange={onChangeProject}
                />

                <input 
                    type="submit"
                    className="btn btn-primario btn-block"
                    value="Agregar Proyecto"
                />

            </form>
            : null
            }

            {errorForm ? <p className=" mensaje error">El nombre de proyecto es obligatorio</p> : null}
        </Fragment>
     );
}
 
export default NewProject;