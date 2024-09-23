import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify, Notification } from 'react-admin';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


const LoginPage = () => {
    const [email, setEmail] = useState(''); // Estado para almacenar el nombre de usuario
    const [password, setPassword] = useState(''); // Estado para almacenar la contraseña
    const login = useLogin(); // Hook de react-admin para gestionar el login
    const notify = useNotify(); // Hook de react-admin para mostrar notificaciones

    const handleLogin = async () => {
        try {
            await login({ email, password });
            const auth = localStorage.getItem('auth'); // Obtener la información de autenticación del localStorage
            const role = localStorage.getItem('role'); // Obtener la información de role
            if (auth) {
                console.log(JSON.parse(auth)); // Mostrar la información de autenticación
            }
        } catch (error) {
            notify('Credenciales inválidas', { type: 'warning' }); // Mostrar notificación de error si las credenciales no son válidas
        }
    };


    return (
        <div>
            <h2>Login</h2>
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Actualizar el estado del nombre de usuario
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Actualizar el estado de la contraseña
            />
            <Button onClick={handleLogin}>Login</Button> {/* Botón para iniciar sesión */}
        </div>
    );
};

export default LoginPage;