import supertest from 'supertest';
import { app } from '../server'; // Assuming this imports your Express app
import blogController from '../controller/blogs.controller';

describe('Blog Controller Tests', () => {
  // Mock request and response objects
  const req = {} as any;
  const res = {} as any;
  // Mock response methods
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  // Mock file object for create_blogs function
  const file = {
    path: '/path/to/image.jpg', // Replace with actual path
  };

  describe('create_blogs', () => {
    it('should create a new blog', async () => {
      // Mock request body
      req.body = {
        title: 'Test Blog',
        content: 'This is a test blog content',
        author: 'Test Author',
      };
      req.file = file; // Attach mock file to request
      await blogController.create_blogs(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'New blog created successfully',
      });
    });
  });

  describe('getAllBlogs', () => {
    it('should return all blogs', async () => {
      await blogController.getAllBlogs(req, res);
      // Add your expectations for the response here
    });
  });

  describe('getSingleBlog', () => {
    it('should return a single blog', async () => {
      req.params = { id: 'blogId' }; // Mock blog ID
      await blogController.getSingleBlog(req, res);
      // Add your expectations for the response here
    });
  });

  describe('updatedBlogs', () => {
    it('should update an existing blog', async () => {
      // Mock request body
      req.params = { id: 'blogId' }; // Mock blog ID
      req.body = {
        title: 'Updated Test Blog',
        content: 'This is an updated test blog content',
        author: 'Updated Test Author',
      };
      await blogController.updatedBlogs(req, res);
      // Add your expectations for the response here
    });
  });

  describe('removeBlogs', () => {
    it('should delete an existing blog', async () => {
      req.params = { id: 'blogId' }; // Mock blog ID
      await blogController.removeBlogs(req, res);
      // Add your expectations for the response here
    });
  });
});
