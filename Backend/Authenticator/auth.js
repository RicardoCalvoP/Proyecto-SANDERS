import jwt from "jsonwebtoken";

export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;  // Obtenemos el token del header

    console.log('Authorization Header On Backend:', authHeader); // Imprime el header de Authorization

    if (authHeader) {
        const token = authHeader.split(' ')[1];  // Separamos el 'Bearer' del token

        console.log('Token:', token);  // Imprime el token extraído

        // Verificar el token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Token inválido o expirado' }); // Token no válido
            } else {
                req.user = decoded; // Guardar la información del token en `req.user`
                next(); // Continuar con la siguiente función en la ruta
            }
        });
    } else {
        return res.status(401).json({ error: 'No se proporcionó token' }); // No se proporcionó el token
    }
};
