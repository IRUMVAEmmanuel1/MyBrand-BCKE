import { Request, Response } from "express";
import coments from "../models/comments";
import joiValidation from "../helper/joi.validation";
const create_coments = async (req: Request, userId:string) => {
	const valid = joiValidation.validateCommentData(req.body);
	const id = { _id: req.params.id };
	console.log(userId);
	if (valid.error) {
		return false;
	} else {
		const created_coments = new coments({
			user: userId,
			coment: req.body.coment,
			blogID: id,
		});
		await created_coments.save();
	}
};
const fetchComents = async (req: Request) => {
	try {
		const id = { _id: req.params.id };
		return await coments.find({ blogID: id });
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export default {
	create_coments,
	fetchComents,
};
