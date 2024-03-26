import express from 'express';
import Jwt from "../helper/jwt";
import blogsController from "../controller/blogs.controller";
import uploadService from "../service/multer";
import { isAdmin } from "../middleware/UserMiddleware";

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
 *        - JWTAuth: []
 *     summary: Create a new blog post
 *     tags: [Blogs]
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
 *           format: binary
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
 * securitySchemes:
 *   JWTAuth:
 *     type: apiKey
 *     in: header
 *     name: Authorization
 *     description: Enter JWT token with 'Bearer ' prefix
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
 * /api/v1/users/authenticate:
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
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       401:
 *         description: Unauthorized, invalid credentials
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
 */
