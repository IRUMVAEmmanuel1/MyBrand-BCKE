import { Request as ExpressRequest, Response, NextFunction } from 'express';

// Define a custom interface that extends ExpressRequest
interface CustomRequest extends ExpressRequest {
  currentUser?: {
    isAdmin: boolean;
   
  };
}

export const isAdmin = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const currentUser = req.currentUser;
  try {
    if (currentUser && currentUser.isAdmin) {
      next();
    } else {
      return res.status(401).json({
        status: 401,
        message: "This action can only be performed by an admin.",
      });
    }
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
};
