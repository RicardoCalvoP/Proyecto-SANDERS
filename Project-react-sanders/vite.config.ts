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
        https: {
            key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
            cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))

        }
    },

    base: './',
});


