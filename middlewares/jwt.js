import jwt from "jsonwebtoken";
import "dotenv/config";

const TOKEN_SECRET = process.env.TOKEN_SECRET;
export const genereateToken = async (userObject) => {
  try {
    const payload = {
      userId: userObject.userId, // Example: user ID
      username: userObject.username, // Example: username
      role: userObject.role,
    };
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

export const verifyToken = async (token) => {
  try {
    // Verify the token
    const decoded = jwt.verify(token, TOKEN_SECRET);

    // If verification is successful, return the decoded payload
    return {
      success: true,
      payload: decoded,
      message: "Token verified",
    };
  } catch (error) {
    // If verification fails, handle the error
    console.error("Error verifying token:", error);
    return {
      success: false,
      message: "Token verification failed",
    };
  }
};
