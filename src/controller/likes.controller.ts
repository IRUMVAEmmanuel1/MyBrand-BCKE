import express, { Request, Response } from "express";
import likeSercice from "../service/likeService";
import blogService from "../service/blogService";
import joiValidation from "../helper/joi.validation";
//creating a coments
export const likeOrDislike = async (req: Request, res: Response) => {
  const user: any = req.user;
  try {
    const id = req.params.id;
    const existingLike: any = await likeSercice.getSingleLike(id, user._id);
    if (existingLike) {
      await likeSercice.remove_likes(existingLike._id);
      res.status(200).json({ status: "success", message: "Like removed successfully" });
    } else {
      const blog: any = await blogService.retrieveSingleBlogs(req);
      if (!blog) {
        return res.status(404).json({ status: "Error", message: "Blog not found" });
      }
      const Like = await likeSercice.createLike(id, user._id);
      res.status(201).json({
        status: "success",
        message: "your like was added",
        data: Like
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const getLikesBasedOnBlogId = async (req: Request, res: Response) => {
	const likes: any = await likeSercice.fetchlikes(req);
	if (likes.length < 1) {
		res.status(200).json({ status: 200, likes: likes });
	} else {
		res.status(200).json({ status: 200, likes: likes });
	}
};


export default {
	getLikesBasedOnBlogId,
	likeOrDislike

};
