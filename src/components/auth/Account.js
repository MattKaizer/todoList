import React, { useState,  } from 'react';
import { Link } from 'react-router-dom';

const Account = () => {

    //State for login
    const [user, setUser] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmedpassword: ''
    })
    //Distructuring
    const { fullname, email, password, confirmedpassword } = user;

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
        if(email.trim() === '' || password.trim() === '' || fullname.trim() === '' || confirmedpassword.trim() === '') {
            // mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        }
         //validate password


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
                        <label htmlFor="fullname">Nombre</label>
                        <input 
                            type="text"
                            id="fullname"
                            name="fullname"
                            placeholder="Tu nombre completo"
                            value={fullname}
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
                            value={password}
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