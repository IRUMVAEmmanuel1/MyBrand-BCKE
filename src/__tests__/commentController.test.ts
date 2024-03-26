import supertest from 'supertest';
import { app } from '../server'; // Assuming this imports your Express app
import commentController from '../controller/coments.controler';

describe('Comment Controller Tests', () => {
  // Mock request and response objects
  const req = {} as any;
  const res = {} as any;
  // Mock response methods
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  describe('createComents', () => {
    it('should create a new comment', async () => {
      // Mock request body
      req.body = {
        text: 'Test comment',
        userId: 'userId', // Mock user ID
        blogId: 'blogId', // Mock blog ID
      };
      await commentController.createComents(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'New comment created',
      });
    });
  });

  describe('getComentBasedOnBlogId', () => {
    it('should return comments based on blog ID', async () => {
      req.params = { blogId: 'blogId' }; // Mock blog ID
      await commentController.getComentBasedOnBlogId(req, res);
      // Add your expectations for the response here
    });
  });
});
