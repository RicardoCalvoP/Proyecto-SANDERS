import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        'process.env': process.env,
    },
    server: {

        // HTTPS 
        https: {
            key: fs.readFileSync(path.resolve(__dirname, 'certs/server.key')),
            cert: fs.readFileSync(path.resolve(__dirname, 'certs/server.crt'))

        }

        // HTTP
        //host: true,
    },

    base: './',
});


