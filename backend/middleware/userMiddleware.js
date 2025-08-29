import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const userMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || typeof decoded !== 'object' || !decoded.userId) {
      return res.status(403).json({ error: 'Invalid token payload' });
    }

    req.userId = decoded.userId;
    next();
  } catch (err) {
    const message =
      err.name === 'TokenExpiredError'
        ? 'Token has expired'
        : err.name === 'JsonWebTokenError'
        ? 'Token is malformed'
        : 'Authentication failed';

    return res.status(401).json({ error: message });
  }
};

export default userMiddleware;
