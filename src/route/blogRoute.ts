import express, { Request, Response } from "express";
import Jwt from "../helper/jwt";

import blogsController from "../controller/blogs.controller";
import uploadService from "../service/multer";
import { isAdmin } from "../middleware/UserMiddleware";

const blogRoutes = express.Router();
blogRoutes.post("/blogs", uploadService.single("image"), Jwt.tokenValidation, isAdmin, blogsController.create_blogs);

blogRoutes.get("/blogs", blogsController.getAllBlogs);
blogRoutes.get("/blogs/:id", blogsController.getSingleBlog);
blogRoutes.patch("/blogs/:id", blogsController.updatedBlogs);
blogRoutes.delete("/blogs/:id", blogsController.removeBlogs);




export default blogRoutes;


