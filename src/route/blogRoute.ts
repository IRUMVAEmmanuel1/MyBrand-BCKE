import express, { Request, Response } from "express";
import Jwt from "../helper/jwt";
import blogsController from "../controller/blogs.controller";
import uploadService from "../service/multer";
import { isAdmin } from "../middleware/UserMiddleware";
import {isLoggedIn} from "../middleware/normalUser"
const blogRoutes = express.Router();

blogRoutes.post("/blogs", uploadService.single("image"), isLoggedIn, isAdmin, blogsController.create_blogs);
blogRoutes.get("/blogs", blogsController.getAllBlogs);
blogRoutes.get("/blogs/:id", blogsController.getSingleBlog);
blogRoutes.patch("/blogs/:id", isLoggedIn, isAdmin, blogsController.updatedBlogs);
blogRoutes.delete("/blogs/:id", isLoggedIn, isAdmin, blogsController.removeBlogs);

export default blogRoutes;