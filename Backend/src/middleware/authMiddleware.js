import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import responses from "../common/response.js";
dotenv.config();

export function auth(req, res, next) {
  const authToken = req.headers['authorization'];

  if (!authToken) {
    return res.status(401).send(responses.unauthorized);
  }

  try {
    const token = authToken.split(' ')[1];
    console.log("aaaaa",token);
    jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
      console.log("decoded : " , decoded);
      if (err) {
        console.error("Token verification error:", err);
        return res.status(403).send(responses.errorOccured(403, "Invalid token"));
      }
      req.user = decoded; // Assign decoded token data to req.user
      next();
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).send(responses.errorOccured(500, "Token verification failed"));
  }
}
