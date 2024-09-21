import { AuthProvider, HttpError } from "react-admin";
/**
 * This authProvider is only for test purposes. Don't use it in production.
 */
export const authProvider: AuthProvider = {
  login: ({ email, password }) => { // Comunicación con el backend en el proceso de login
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `https://localhost:5001/login`, true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const json = JSON.parse(xhr.responseText); // Parsear la respuesta JSON
            console.log('Response received:', json);
            localStorage.setItem('auth', JSON.stringify({ ...json })); // Guardar el token en localStorage
            resolve(json); // Resolver la promesa con la respuesta JSON
          } else {
            console.error('Login failed:', xhr.status, xhr.statusText);
            reject(new Error('Network error')); // Rechazar la promesa si falla
          }
        }
      };

      const requestBody = JSON.stringify({ email, password });
      console.log('Request Body:', requestBody);
      xhr.send(requestBody); // Enviar el cuerpo de la solicitud como JSON
    });
  },
  logout: () => {
    localStorage.removeItem("user");
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () =>
    localStorage.getItem("user") ? Promise.resolve() : Promise.reject(),
  getPermissions: () => {
    return Promise.resolve(undefined);
  },
  getIdentity: () => {
    const persistedUser = localStorage.getItem("user");
    const user = persistedUser ? JSON.parse(persistedUser) : null;

    return Promise.resolve(user);
  },
};

export default authProvider;
