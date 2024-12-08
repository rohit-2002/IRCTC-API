const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get the token from the Authorization header
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    console.log("Verified Token:", verified); // Debugging line
    req.user = verified; // Attach the user data to the request object
    next(); // Move to the next middleware or controller
  } catch (error) {
    console.error("Token verification failed:", error); // Debugging line
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = verifyToken;
