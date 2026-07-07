import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '7d9a7493be32f7200aad8ddb829719d09c2dd2e43beb95ba8a2d98ba71afc082';

export function requireAuth(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '') || null;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
