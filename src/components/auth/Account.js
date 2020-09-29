import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AlertContext from '../../context/alerts/AlertContext';
import AuthContext from '../../context/authentication/AuthContext';

const Account = (props) => {

    // get values from context
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;
    const authContext = useContext(AuthContext);
    const { message, authenticated, newRegisterUser } = authContext;

    // in case user is already registered
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
        name: '',
        email: '',
        password: '',
        confirmedpassword: ''
    })
    //Distructuring
    const { name, email, password, confirmedpassword } = user;

    const onChange = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    // when login
    const onSubmit = e => {
        e.preventDefault();

        // Validate fields
        if(email.trim() === '' || password.trim() === '' || name.trim() === '' || confirmedpassword.trim() === '') {
            showAlert('Todos los campos son obligatorios', 'alert-error');
            return;
        }
        //validate password
        if (password.length < 8 ) {
            showAlert('El password debe tener al menos 8 caracteres.', 'alert-error');
            return;
        }
        
        if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, 'i') && password.length >= 8) {
            showAlert('El password debe contener, al menos, un caracter numérico, una letra mayúscula y 6 minúsculas.', 'alert-error');
            return;
        }

        if (password.localeCompare(confirmedpassword) !== 0 ) {
            showAlert('Las contraseñas no coinciden.', 'alert-error');
            return;            
        }
        // Pass to action
        newRegisterUser({
            name,
            email,
            password
        })
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
                        <label htmlFor="name">Nombre</label>
                        <input 
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Tu nombre completo"
                            value={name}
                            onChange={onChange}
                        />
                    </div>
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
                        <label htmlFor="confirmedpassword">Password</label>
                        <input 
                            type="password"
                            id="confirmedpassword"
                            name="confirmedpassword"
                            placeholder="Repite tu Password"
                            value={confirmedpassword}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Registrar" />
                    </div>
                </form>
                <Link to={'/'} className="link-to-account">
                    Volver a Iniciar Sesion
                </Link>
            </div>
        </div>
     );
}
 
export default Account;