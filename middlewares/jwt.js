import jwt from "jsonwebtoken";
import "dotenv/config";

const TOKEN_SECRET = process.env.TOKEN_SECRET;
export const genereateToken = async (userObject) => {
  try {
    const payload = { ...userObject };
    // Generate a token using jwt.sign()
    const token = jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1h" }); // Change 'your_secret_key' to your actual secret key

    return {
      succes: true,
      token: token,
      message: "Token generated",
    };
  } catch (error) {
    return {
      succes: false,
      message: "Unable to generate token",
    };
  }
};

export const verifyTokenMiddleware = (requiredRole) => (req, res, next) => {
  // Get the token from the request headers or query parameters or cookies
  const token =
    req.headers.authorization || req.query.token || req.cookies.token;

  if (!token) {
    return res.status(401).render("403");
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, TOKEN_SECRET);

    // Set req.user to the decoded payload
    req.user = decoded;

    if (!requiredRole.includes(req.user.role)) {
      return res.status(403).render("403");
    }

    // Call next to move to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res
      .status(401)
      .json({ success: false, message: "Token verification failed" });
  }
};

export const verifyPassTokenMiddleware = (req, res, next) => {
  // Get the token from the request headers or query parameters or cookies
  const token =
    req.headers.authorization || req.query.passToken || req.cookies.passToken;

  if (!token) {
    return res.status(401).render("403");
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, TOKEN_SECRET);

    // Set req.user to the decoded payload
    req.resetRequestUser = decoded;

    // Call next to move to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error verifying pass token:", error);
    return res
      .status(401)
      .json({ success: false, message: "Pass Token verification failed" });
  }
};

export const isLoggedIn = async (req, res, next) => {
  // Get the token from the request headers, query parameters, or cookies
  const token =
    req.headers.authorization || req.query.token || req.cookies.token;

  if (!token) {
    // User is not logged in, move to the next middleware or route handler
    return next();
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, TOKEN_SECRET);

    // Set req.user to the decoded payload
    req.user = decoded;

    // Redirect to appropriate home page based on user's role
    if (req.user.role === "faculty") {
      return res.redirect("/faculty/home");
    } else if (req.user.role === "student") {
      return res.redirect("/student/home");
    }

    // Unknown role, return an error response
    return res.status(403).render("403");
  } catch (error) {
    console.error("Error verifying token:", error);
    return res
      .status(401)
      .json({ success: false, message: "Token verification failed" });
  }
};
