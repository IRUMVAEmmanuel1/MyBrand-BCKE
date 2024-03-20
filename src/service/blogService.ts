import { Request } from "express";
import Blogs from "../models/blogs";
import joiValidation from "../helper/joi.validation";
import { v2 as cloudinary } from "cloudinary";

// cloudinary configuration

cloudinary.config({ 
  cloud_name: 'dd46id3xx', 
  api_key: '676727721327958', 
  api_secret: 'geMdvbckvvTS2VEaFOXjD6gJ-ik' 
});

const createBlogs = async (req: any, image: string) => {
	try {
		const valid = joiValidation.validateBlogData(req.body);
		if (valid.error) {
			return false;
		} else {
			const blogs = new Blogs({
				title: req.body.title,
				image: image,
				content: req.body.content,
			});
			await blogs.save();
			return blogs;
		}
	} catch (err: any) {
		throw new Error(err.message);
	}
};

const retrieveBlogs = async () => {
	try {
		return await Blogs.find();
	} catch (error: any) {
		throw new Error(error.message);
	}
};

const retrieveSingleBlogs = async (req: Request) => {
	try {
		const id = { _id: req.params.id };
		return await Blogs.findOne(id);
	} catch (error: any) {
		throw new Error(error.message);
	}
};

const updateBlogs = async (req: Request) => {
	try {
		const id = { _id: req.params.id };
		const update_blogs: any = await Blogs.findOne(id);
		if (!update_blogs) {
			return false;
		} else {
			if (req.body.title) {
				update_blogs.title = req.body.title;
			}
			if (req.body.image) {
				// Upload updated image to Cloudinary
				const image = await cloudinary.uploader.upload(req.body.image, {
					folder: "blog_images",
				});
				update_blogs.image = image.secure_url;
			}
			if (req.body.coment) {
				update_blogs.coment = req.body.coment;
			}
		}
		await update_blogs.save();
		return update_blogs;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

const removeBlogs = async (req: Request) => {
	try {
		const id = { _id: req.params.id };
		const deleteBlg: any = await Blogs.deleteOne(id);
		if (!deleteBlg) {
			return false;
		} else {
			return deleteBlg;
		}
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export default {
	createBlogs,
	retrieveBlogs,
	retrieveSingleBlogs,
	updateBlogs,
	removeBlogs,
};
