import express, { Request, Response } from "express";
import Jwt from "../helper/jwt";

import blogsController from "../controller/blogs.controller";
import uploadService from "../service/multer";
import { isAdmin } from "../middleware/UserMiddleware";

const blogRoutes = express.Router();
blogRoutes.post("/blog", uploadService.single("image"), Jwt.tokenValidation, isAdmin, blogsController.create_blogs);

blogRoutes.get("/blogs", blogsController.getAllBlogs);
blogRoutes.get("/blog/:id", blogsController.getSingleBlog);
blogRoutes.patch("/blog/:id", blogsController.updatedBlogs);
blogRoutes.delete("/blog/:id", blogsController.removeBlogs);




/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: API endpoints for managing blogs
 */

/**
 * @swagger
 * /api/blog:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the blog post
 *               image:
 *                 type: string
 *                 description: URL of the image for the blog post
 *               content:
 *                 type: string
 *                 description: The content of the blog post
 *            
 *     responses:
 *       201:
 *         description: Blog post created successfully
 *       400:
 *         description: Invalid request body
 */

export default blogRoutes;


