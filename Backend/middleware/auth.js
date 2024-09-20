import jwt from "jsonwebtoken";

export const authenticateJWT  = () => {
    if (token) {
        jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Token inválido' });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        res.status(401).json({ error: 'No se proporcionó token' });
    }
};