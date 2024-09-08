import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify, Notification } from 'react-admin';
import Button from '@mui/material/Button';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // will call authProvider.login({ email, password })
        login({ username:'john', password:'doe' }).catch(() => notify("Invalid email or password"));
    };

    return (
        <form>
            <input
                name="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                name="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <Button variant="contained" onClick={handleSubmit}>Login</Button>
        </form>
    );
};

export default LoginPage;