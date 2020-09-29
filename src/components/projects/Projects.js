import React, { useContext, useEffect } from 'react'
import Sidebar from '../layout/Sidebar';
import HeaderBar from '../layout/Headerbar';
import FormTask from '../tasks/FormTask';
import TaskList from '../tasks/TaskList';

import AuthContext from '../../context/authentication/AuthContext';

const Projects = () => {

    // get auth info
    const authContext = useContext(AuthContext);
    const { authenticatedUser } = authContext;

    useEffect(() => {
        authenticatedUser();
        // eslint-disable-next-line
    }, []);

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