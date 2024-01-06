import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      data?: string | jwt.JwtPayload | undefined;
    }
  }
}

// Define a middleware function to validate JWT tokens
export const jwtMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the JWT token from the request headers
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "JWT secret is not defined" });
  }

  // Verify and decode the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }

    // Store the decoded token in the request for further use
    req.data = decoded;
    console.log(req.data);
    next();
  });
};
