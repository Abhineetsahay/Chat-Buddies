const jwt = require('jsonwebtoken');
require('dotenv').config();


// authenicating jwt token

exports.jwtauthenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token provided or token format is incorrect",
    });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    req.user = decoded; // Attach user payload to request object
    next();
  });
};