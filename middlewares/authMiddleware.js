import jwt from 'jsonwebtoken';

const authMiddleware = (roles = []) => {
  if (typeof roles === 'string') roles = [roles]; // Ensure roles is always an array

  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      console.log(`[AuthMiddleware] No token provided`);
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      console.log(`\n[AuthMiddleware] Decoded Token:`);
      console.log(decoded);
      console.log(`[AuthMiddleware] Required Roles:`, roles);

      // Check if the role from the token matches one of the allowed roles
      if (roles.length && !roles.includes(decoded.role)) {
        console.log(`[AuthMiddleware] Forbidden: Role mismatch - User Role: ${decoded.role}`);
        return res.status(403).json({ message: 'Forbidden: Role mismatch' });
      }

      next();
    } catch (error) {
      console.error(`[AuthMiddleware] Token error: ${error.message}`);
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};

export default authMiddleware;
