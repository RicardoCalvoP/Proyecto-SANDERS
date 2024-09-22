import { AuthProvider } from 'react-admin';

const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
        const request = new Request(`${import.meta.env.VITE_MONGO_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });

        const res = await fetch(request);
        if (res.status > 200) {
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
    getPermissions: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return Promise.reject();
        }
        try {
            const request = new Request(`${import.meta.env.VITE_API_URL}/api/auth/permissions`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }),
            });

            const response = await fetch(request);
            if (response.status < 200 || response.status >= 300) {
                throw new Error('Failed to fetch permissions');
            }

            const { role } = await response.json();
            
            if (role === 'admin') {
                return Promise.resolve('admin');
            } else if (role === 'donor') {
                return Promise.resolve('donor');
            }
        } catch (error) {
            return Promise.reject('No permissions found');
        }
        return Promise.reject();
    },
};

export default authProvider;