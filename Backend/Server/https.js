// HTTPS Server
// This file is to start server in HTTPS format

import https from 'https'; // Para crear un servidor HTTPS
import fs from 'fs'; // Maneja archivos del sistem
import app from '../app.js'



export function startHttpsServer(port) {
    // Leer certificados SSL
    const privateKey = fs.readFileSync('./certs/server.key', 'utf8');
    const certificate = fs.readFileSync('./certs/server.crt', 'utf8');
    const ca = fs.readFileSync('./certs/ca/ca.crt', 'utf8');
    const credentials = { key: privateKey, cert: certificate, ca: ca };

    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(port, () =>
        console.log(`Server running on port ${port} with HTTPS`)
    )

}