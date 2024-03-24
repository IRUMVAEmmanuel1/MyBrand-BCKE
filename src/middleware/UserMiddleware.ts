import { NextFunction, Response } from "express";
// import { UserDocument } from "../model/userMode";
export const isAdmin = async (req: any, res: Response, next: NextFunction) => {
	const currentUser = req.currentUser;
	try {
		if (currentUser.isAdmin) {
			next();
		} else {
			return res.status(401).json({
				status: 401,
				message: "This Action is only performed by Admin",
			});
		}
	} catch (error: any) {
		return res.status(401).json({ error: error.message });
	}
};
