import React, { useState,  } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

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
            // mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        }

        // Pass to action
        // iniciarSesion({ email, password });
    }

    return ( 
        <div className="form-user">
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