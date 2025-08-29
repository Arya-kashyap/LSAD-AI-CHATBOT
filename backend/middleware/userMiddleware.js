import jwt from 'jsonwebtoken';
import { connectDB } from '../utils/dbConnect.js';

const userMiddleware =async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    await connectDB();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.userId) {
      return res.status(403).json({ error: 'Invalid token payload' });
    }

    req.userId = decoded.userId;
    next();
  } catch (err) {
    const message = {
      TokenExpiredError: 'Token has expired',
      JsonWebTokenError: 'Token is malformed'
    }[err.name] || 'Authentication failed';

    return res.status(401).json({ error: message });
  }
};

export default userMiddleware;
