import { Request, Response } from "express";
import blogsService from "../service/blogService";
import blogCervice from "../service/blogService";
import joiValidation from "../helper/joi.validation";
import { v2 as cloudinary } from "cloudinary";

// cloudinary configuration
cloudinary.config({
	cloud_name: "dd46id3xx",
	api_key: "676727721327958",
	api_secret: "geMdvbckvvTS2VEaFOXjD6gJ-ik",
});

const create_blogs = async (req: any, res: Response) => {
	try {
		const valid = joiValidation.validateBlogData(req.body);
		// Upload image to Cloudinary
		const image = await cloudinary.uploader.upload(req.file.path, {
			folder: "blog_images",
		});
		const blogs = await blogsService.createBlogs( req, image.secure_url);
		if (!blogs) {
			res.status(401).json({
				status: 401,
				message: valid.error?.message,
			});
		} else {
			res.status(200).json({
				status: 200,
				message: "New blog created successfully",
			});
		}
	} catch (error: any) {
		res.send(error.message);
	}
};

const getAllBlogs = async (req: Request, res: Response) => {
	const blogs: any = await blogsService.retrieveBlogs();
	if (blogs.length < 1) {
		res.status(404).json({ status: 404, blogs: blogs });
	} else {
		res.status(200).json({ status: 200, blogs: blogs });
	}
};

const getSingleBlog = async (req: Request, res: Response) => {
	const blogs: any = await blogCervice.retrieveSingleBlogs(req);
	if (!blogs) {
		res.status(404).json({ status: 404, blogs: " Blog Not Found" });
	} else {
		res.status(200).json({ status: 200, blogs: blogs });
	}
};

const updatedBlogs = async (req: Request, res: Response) => {
	const updateBlg = await blogCervice.updateBlogs(req);
	if (!updateBlg) {
		res.status(404).json({ status: 404, blogs: " Blog Not Found" });
	} else {
		res.status(200).json({
			status: 200,
			message: "Blog Updated Successfully",
		});
	}
};

const removeBlogs = async (req: Request, res: Response) => {
	const deleted: any = await blogCervice.removeBlogs(req);
	if (deleted.deletedCount === 0) {
		res.status(404).json({ status: 404, blogs: " Blog Not Found" });
	} else {
		res.status(200).json({
			status: 200,
			message: "Blog deleted Successfully",
		});
	}
};

export default {
	create_blogs,
	getAllBlogs,
	getSingleBlog,
	updatedBlogs,
	removeBlogs,
};
