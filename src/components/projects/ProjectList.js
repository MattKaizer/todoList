import React, { useContext, useEffect } from 'react';
import Project from './Project';
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
            {projectList.map(project => (
                <Project key={project.id} project={project}/>
            ))}
        </ul>
     );
}
 
export default ProjectList;