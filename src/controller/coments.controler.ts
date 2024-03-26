import express, { Request, Response } from "express";
import cometSercice from "../service/commentSercice";
import joiValidation from "../helper/joi.validation";
// creating a coments
const createComents = async (req: Request, res: Response) => {
	let user:any = req.user

	try {
		const valid = joiValidation.validateCommentData(req.body);
		const coments = await cometSercice.create_coments(req, user._id);
		if (coments === false) {
			res.status(401).json({
				status: 401,
				message: valid.error?.message,
			});
		} else {
			res.status(200).json({
				status: 200,
				message: "New comment created",
			});
		}
	} catch (error: any) {
		res.send(error.message);
	}
};

const getComentBasedOnBlogId = async (req: Request, res: Response) => {
	const coment: any = await cometSercice.fetchComents(req);
	if (coment.length < 1) {
		res.status(200).json({ status: 200, coment: coment });
	} else {
		res.status(200).json({ status: 200, coment: coment });
	}
};

export default {
	createComents,
	getComentBasedOnBlogId,
};
