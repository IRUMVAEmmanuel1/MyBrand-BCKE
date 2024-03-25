import likeController from '../controller/likes.controller';

describe('Like Controller Tests', () => {
  let req:any;
  let res:any;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('createLikes', () => {
    it('should create a new like', async () => {
      req.body = { like: 'likeValue' };
      await likeController.createLikes(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'New like created',
      });
    });

    it('should return validation error if invalid data is provided', async () => {
      req.body = { invalidField: 'value' }; // Invalid data
      await likeController.createLikes(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        status: 401,
        message: 'Validation error message',
      });
    });
  });

  describe('getLikesBasedOnBlogId', () => {
    it('should return likes based on blog ID', async () => {
      req.params.id = 'blogId';
      await likeController.getLikesBasedOnBlogId(req, res);
      // Add your expectations for the result here
    });
  });

  describe('removeLikes', () => {
    it('should remove a like', async () => {
      req.params.id = 'likeId';
      await likeController.removeLikes(req, res);
      // Add your expectations for the result here
    });
  });
});
