const jwt = require("jsonwebtoken");
const AppError = require("../utils/error");

const authMiddleware = (req, res, next) => {
  try {
    console.log("🔹 Incoming cookies:", req.cookies);
    console.log("🔹 Authorization header:", req.headers.authorization);

    const authHeader = req.headers.authorization;
    const cookieToken = req.cookies?.token;
    let token;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (cookieToken) {
      token = cookieToken;
    }

    if (!token) {
      console.log("No token found");
      throw new AppError("Authentication requires a valid token", 401);
    }

    console.log(" Token found:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    console.log("Decoded token payload:", decoded);

    // Set user info
    req.user = { id: decoded.id, role: decoded.role };

    next();
  } catch (error) {
    console.log("Auth error:", error.message);
    next(new AppError("Invalid or expired token", 401));
  }
};

module.exports = authMiddleware;
