import { fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

// URL base de tu servidor
const apiUrl = import.meta.env.VITE_JSON_SERVER_URL;

// Definimos el cliente HTTP que intercepta las solicitudes
const httpClient = (url: string, options: any = {}) => {
  // Si no existen headers, los inicializamos
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }

  // Recuperamos el token del localStorage
  const token = localStorage.getItem('token');

  console.log("Token enviado en header: ", token);  // Asegúrate de que el token existe

  if (token) {
    // Si existe el token, lo incluimos en el header de Authorization
    options.headers.set('Authorization', `Bearer ${token}`);
  }

  // Hacemos la solicitud HTTP con el token
  return fetchUtils.fetchJson(url, options);
};

// Creamos el dataProvider usando el cliente modificado con el token
const dataProvider = jsonServerProvider(apiUrl, httpClient);

export default dataProvider;
