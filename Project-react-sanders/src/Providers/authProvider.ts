import { AuthProvider } from 'react-admin';

const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
        const request = new Request(`${import.meta.env.VITE_JSON_SERVER_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });

        const res = await fetch(request);
        if (res.status > 300) {
            throw new Error(res.statusText);
        }

        const { token, rol } = await res.json();
        localStorage.setItem('token', token);
        localStorage.setItem('role', rol);
    },
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('token')
            ? Promise.resolve()
            : Promise.reject();
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        return Promise.resolve();
    },
    getIdentity: () => {
        try {
            const { id, name } = JSON.parse(localStorage.getItem('identity') || '{}');
            return Promise.resolve({ id, name });
        } catch (error) {
            return Promise.reject();
        }
    },
    getPermissions: async (_params?: any) => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token) {
            return Promise.reject();
        }

        if (role) { return Promise.resolve(role); }

        return Promise.reject('No permissions found');
    },
};

export default authProvider;