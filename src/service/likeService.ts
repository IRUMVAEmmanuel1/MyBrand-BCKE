import { Request, Response } from "express";
import likes from "../models/like";
import joiValidation from "../helper/joi.validation";

export const createLike = async (id: string, user: string) => {
	const Like = await likes.create({
			blogID: id,
			userId: user,
	});
	return Like;
}
const getSingleLike = async (blogId: string, userId: string) => {
	const like = await likes.findOne({ blogID: blogId, userId: userId});
	return like;
}
const fetchlikes = async (req: Request) => {
	try {
		const id = { _id: req.params.id };
		return await likes.find({ blogID: id });
	} catch (error: any) {
		throw new Error(error.message);
	}
};
const remove_likes = async (id: string) => {
	const like = await likes.findByIdAndDelete(id)
	return null;
}
export default {
	createLike,
	fetchlikes,
	remove_likes,
	getSingleLike
};
