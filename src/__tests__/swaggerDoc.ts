import express from "express";
import Jwt from "../helper/jwt";
import blogsController from "../controller/blogs.controller";
import uploadService from "../service/multer";
import { isAdmin } from "../middleware/UserMiddleware";
// import user/C
// const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: API endpoints for managing blogs
 */

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     security:
 *        - Autherization: []
 *     summary: Create a new blog post
 *     tags: [Blogs]
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/BlogPost'
 *     responses:
 *       201:
 *         description: Blog post created successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized, JWT token is missing or invalid
 *       403:
 *         description: Forbidden, user does not have permission to create blog post
 */

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: List of blogs retrieved successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: Get a single blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog to get
 *     responses:
 *       200:
 *         description: Blog retrieved successfully
 *       404:
 *         description: Blog not found
 *   patch:
 *     summary: Update a blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BlogPost'
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       404:
 *         description: Blog not found
 *   delete:
 *     summary: Delete a blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog to delete
 *     responses:
 *       204:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BlogPost:
 *       type: object
 *       required:
 *         - title
 *         - image
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the blog post
 *         image:
 *           type: string
 *           *format*: binary
 *           description: Image file for the blog post
 *         content:
 *           type: string
 *           description: The content of the blog post
 *       example:
 *         title: Example Blog Title
 *         content: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request, invalid user data
 */

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Authenticate user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 *format*: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User retrived successfully
 *       401:
 *         description: Unauthorized, invalid credentials
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *       404:
 *         description: No users found
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request, invalid user data
 *       409:
 *         description: User already exists
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *   put:
 *     summary: Update user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request, invalid user data
 *       404:
 *         description: User not found
 *   delete:
 *     summary: Delete user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: API endpoints for managing likes
 */

/**
 * @swagger
 * /api/v1/likes:
 *   post:
 *     summary: Create a new like
 *     tags:
 *       - Likes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Like'
 *     responses:
 *       200:
 *         description: New like created
 *       401:
 *         description: Unauthorized, invalid like data
 */

/**
 * @swagger
 * /api/v1/likes/{blogId}:
 *   get:
 *     summary: Get likes based on blog ID
 *     tags:
 *       - Likes
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to get likes for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Likes retrieved successfully
 *       404:
 *         description: No likes found for the specified blog
 *   delete:
 *     summary: Remove like
 *     tags:
 *       - Likes
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to remove like from
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Like deleted successfully
 *       404:
 *         description: Like not found
 */

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API endpoints for managing comments
 */

/**
 * @swagger
 * /api/v1/blogs/{blogId}/comments:
 *   post:
 *     summary: Create a new comment
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to add comment to
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: New comment created
 *       401:
 *         description: Unauthorized, invalid comment data
 */

/**
 * @swagger
 * /api/v1/blogs/{blogId}/comments:
 *   get:
 *     summary: Get comments based on blog ID
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to get comments for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 *       404:
 *         description: No comments found for the specified blog
 */

/**
 * @swagger
 * tags:
 *   name: Queries
 *   description: API endpoints for managing queries
 */

/**
 * @swagger
 * /api/v1/queries:
 *   post:
 *     summary: Create a new query
 *     tags:
 *       - Queries
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Query'
 *     responses:
 *       200:
 *         description: New query created successfully
 *       400:
 *         description: Invalid request body
 */

/**
 * @swagger
 * /api/v1/queries/{id}:
 *   delete:
 *     summary: Delete a query by ID
 *     tags:
 *       - Queries
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the query to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Query deleted successfully
 *       404:
 *         description: Query not found
 */

/**
 * @swagger
 * /api/v1/{id}/queries:
 *   get:
 *     summary: Get all queries
 *     tags:
 *       - Queries
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to get queries for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Queries retrieved successfully
 *       400:
 *         description: Invalid user ID
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Authentication token
 *       404:
 *         description: User not found
 *       401:
 *         description: Incorrect email or password
 */
