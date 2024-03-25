import querriesController from '../controller/querries.controller';
import querriesService from '../service/querriesService';

describe('Queries Controller Tests', () => {
  let req:any;
  let res:any;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('createQuerries', () => {
    it('should create a new query', async () => {
      req.body = { user: 'testuser', message: 'Test message' };
      querriesService.create_querries = jest.fn().mockReturnValue(true);
      await querriesController.createQuerries(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ status: 200, message: 'New Query created' });
    });

    it('should return validation error if invalid data is provided', async () => {
      req.body = { invalidField: 'value' }; // Invalid data
      await querriesController.createQuerries(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ status: 401, message: 'Validation error message' });
    });

    // Add more tests for other scenarios
  });

  // Add tests for other QueriesController functions (getAllQuerries, removeQuerries)
});

describe('Queries Service Tests', () => {
  // Write tests for querriesService functions similarly using Jest mocks
});
