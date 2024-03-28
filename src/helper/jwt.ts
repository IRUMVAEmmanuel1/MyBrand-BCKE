import jwt, { sign, verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import user from "../models/user";
import userService from "../service/userService";

interface AuthRequest extends Request {
  user?: any; // Define the user property with the appropriate type
}

const createToken = (user: any) => {
  const accessToken = sign({ userId: user._id }, "whatyouseeiswhatyouget", {expiresIn: "1d"});
  return accessToken;
};

const tokenValidation = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(' ')[1];
  if (accessToken) {
    jwt.verify(accessToken, "whatyouseeiswhatyouget", (err: any, decode: any) => {
      if (err) {
        return res.status(401).json({ message: 'You are not loggedIn' });
      } else {
       
        req.user = decode; // Assign the decoded user data to the custom user property
      
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Please, Login  First" });
  }
};

export default { createToken, tokenValidation };