import React from 'react';
import Account from './components/auth/Account';
import Login from './components/auth/Login';
import Projects from './components/projects/Projects';
import ProjectState from './context/projects/ProjectState';


import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TaskState from './context/task/TaskState';

function App() {
  return (
    <ProjectState>
      <TaskState>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/new-account" component={Account} />
            <Route exact path="/projects" component={Projects} />
          </Switch>
      </Router>
      </TaskState>
    </ProjectState>
  );
}

export default App;
