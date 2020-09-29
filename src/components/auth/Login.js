import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AlertContext from '../../context/alerts/AlertContext';
import AuthContext from '../../context/authentication/AuthContext';

const Login = props => {

        // get values from context
        const alertContext = useContext(AlertContext);
        const { alert, showAlert } = alertContext
        const authContext = useContext(AuthContext);
        const { message, authenticated, initSession } = authContext;
        //if user  or password not exist
        useEffect(() => {
            if (authenticated) {
                props.history.push('/projects') 
            }
            if (message) {
                showAlert(message.msg, message.category);
            }
            // eslint-disable-next-line
        }, [message, authenticated, props.history])

    //State for login
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    //Distructuring
    const { email, password } = user;

    const onChange = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    // when login
    const onSubmit = e => {
        e.preventDefault();

        // Validate
        if(email.trim() === '' || password.trim() === '') {
            showAlert('Todos los campos son obligatorios', 'alert-error');
        }

        // Pass to action
        initSession({ email, password });
    }

    return ( 
        <div className="form-user">
            {/* category return like class toggle */}
            {alert ? (<div className={`alert ${alert.category}`}>{alert.msg}</div>) : null}
            <div className="container-form shadow-dark">
                <h1>Iniciar Sesión</h1>
                <form
                    onSubmit={onSubmit}
                >
                <div className="field-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>

                    <div className="field-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <div className="field-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Iniciar Sesión" />
                    </div>
                </form>
                <Link to={'/new-account'} className="link-to-account">
                    Obtener Cuenta
                </Link>
            </div>
        </div>
     );
}
 
export default Login;