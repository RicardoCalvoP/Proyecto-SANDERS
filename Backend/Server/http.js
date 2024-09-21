// HTTP Server
// This file is to start server in HTTP format

import app from '../app.js'

export function startHttpServer(PORT) {

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });

}