import jwt, { sign, verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import user from "../models/user";

interface AuthRequest extends Request {
  user?: any; // Define the user property with the appropriate type
}

const createToken = (user: any) => {
  const accessToken = sign({ email: user.email }, "whatyouseeiswhatyouget");
  return accessToken;
};

const tokenValidation = (req: AuthRequest, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(' ')[1];
  if (accessToken) {
    jwt.verify(accessToken, "whatyouseeiswhatyouget", (err: any, decode: any) => {
      if (err) {
        return res.status(401).json({ message: 'Your not admin' });
      } else {
        req.user = decode; // Assign the decoded user data to the custom user property
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Login as Admin First" });
  }
};

export default { createToken, tokenValidation };