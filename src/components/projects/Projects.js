import React from 'react'
import Sidebar from '../layout/Sidebar';
import HeaderBar from '../layout/Headerbar';
import FormTask from '../tasks/FormTask';
import TaskList from '../tasks/TaskList';

const Projects = () => {
    return ( 
        <div className="container-app">
            <Sidebar />
            <div className="main-section">
                <HeaderBar />
                <main>
                    <FormTask />
                    <div className="task-container">
                        <TaskList />
                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Projects;