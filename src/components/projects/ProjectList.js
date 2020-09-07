import React, { useContext, useEffect } from 'react';
import Project from './Project';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ProjectContext from '../../context/projects/ProjectContext';

const ProjectList = () => {

    const projectContext = useContext(ProjectContext);
    //distructuring context
    const { projectList, getProjectList } = projectContext;

    useEffect(() => {
        getProjectList();
    }, [])

    if(projectList.length === 0) return <p>No hay proyectos actualmente</p>;

    return ( 
        <ul className="listado-proyectos">
            <TransitionGroup>
                {projectList.map(project => (
                    <CSSTransition
                        key={project.id}
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