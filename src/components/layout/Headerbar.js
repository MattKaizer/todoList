import React, { useEffect, useContext } from 'react';
import { stringify } from 'uuid';

import AuthContext from '../../context/authentication/AuthContext';

const HeaderBar = () => {
    // get auth info
    const authContext = useContext(AuthContext);
    const { user, authenticatedUser } = authContext;

    useEffect(() => {
        authenticatedUser();
    }, [])
    
    // console.log('nombre' + user.user)
    return ( 
        <header className="app-header">
            {user ? <p className="nombre-usuario"><span>Hola { (user.name).charAt(0).toUpperCase() + (user.name).slice(1) }</span></p> : null}

            <nav className="nav-principal">
                <a href="#!">Cerrar Sesión</a>
            </nav>
        </header>
     );
}
 
export default HeaderBar;