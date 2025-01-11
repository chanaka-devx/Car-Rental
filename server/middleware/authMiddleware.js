// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

export function authenticateToken (req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ success: false, message: "Access Denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach user information to the request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token." });
  }
  next();
}

