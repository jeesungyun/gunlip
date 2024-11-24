import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.SECRET_KEY;
const TOKEN_EXPIRATION_PERIOD = 2 * 60 * 1000; // 2 minutes in milliseconds

export function generateToken(username) {
    return jwt.sign(
        { username, exp: Date.now() + TOKEN_EXPIRATION_PERIOD },
        JWT_SECRET
    );
}

export function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.exp < Date.now()) {
            return null;
        }
        return decoded.username;
    } catch {
        return null;
    }
}