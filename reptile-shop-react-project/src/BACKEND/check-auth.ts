import jwt from 'jsonwebtoken';

export const authenticateToken = (req: any, res: any, next: any) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET_KEY || 'your-secret-key', (err: any, decoded: any) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });

    req.user = decoded; // Add the decoded user to the request object
    next(); // Proceed to the next middleware or route handler
  });
};
