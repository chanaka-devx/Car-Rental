// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  // Retrieve token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expected format: "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ success: false, message: "Access token missing." });
  }

  // Verify the token using the super secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Invalid token." });
    }
    req.user = user; // Attach user information to the request object
    next(); // Proceed to the next middleware or route handler
  });
};
