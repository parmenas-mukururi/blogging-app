import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const requiredAuth = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(req.headers);
  if (!token) {
    return res.status(401).json({ status: "fail", message: "Missing token" });
  }

  try {
    // Verify the token with the secret key
    const decoded = jwt.verify(token, secretKey);

    // Attach the decoded payload to the request object
    req.decoded = decoded;

    // Proceed to the next middleware
    next();
  } catch (error) {
    // Handle token verification errors
    return res.status(401).json({ status: "fail", message: "Invalid token" });
  }
};

export { requiredAuth };
