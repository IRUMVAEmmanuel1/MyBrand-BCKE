import { Request, Response, NextFunction } from "express";
import User from "../models/user";

interface AuthRequest extends Request {
  user?: any; // Define the user property with the appropriate type
}

export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (user && user.isAdmin) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized: You are not an admin" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};