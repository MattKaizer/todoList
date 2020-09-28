import React, { useContext, useEffect } from 'react';
import Project from './Project';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ProjectContext from '../../context/projects/ProjectContext';
import AlertContext from '../../context/alerts/AlertContext';

const ProjectList = () => {

    const alertContext = useContext(AlertContext);
    const { message, alert, showAlert } = alertContext;

    const projectContext = useContext(ProjectContext);
    //distructuring context
    const { projectList, getProjectList } = projectContext;

    useEffect(() => {
        // if error
        if (message) {
            showAlert(message.msg, message.category);
        }
        getProjectList();
    }, [message, showAlert, getProjectList])
    
    if(projectList.length === 0) return <p>No hay proyectos actualmente</p>;
    return ( 
        <ul className="listado-proyectos">
        {/* category return like class toggle */}
        {alert ? (<div className={`alert ${alert.category}`}>{alert.msg}</div>) : null}
            <TransitionGroup>
                {projectList.map(project => (
                    <CSSTransition
                        key={project._id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Project project={project}/>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
     );
}
 
export default ProjectList;