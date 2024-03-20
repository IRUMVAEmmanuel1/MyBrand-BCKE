import express, { Request, Response } from "express";
import Jwt from "../helper/jwt";

import blogsController from "../controller/blogs.controller";
import uploadService from "../service/multer";
import { isAdmin } from "../middleware/UserMiddleware";

const blogsRoutes = express.Router();
blogsRoutes.post("/blog", uploadService.single("image"), Jwt.tokenValidation, isAdmin, blogsController.create_blogs);

blogsRoutes.get("/blogs", blogsController.getAllBlogs);
blogsRoutes.get("/blog/:id", blogsController.getSingleBlog);
blogsRoutes.patch("/blog/:id", blogsController.updatedBlogs);
blogsRoutes.delete("/blog/:id", blogsController.removeBlogs);

export default blogsRoutes;
