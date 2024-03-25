import usersController from '../controller/users.controller';
import userService from '../service/userService';

describe('User Controller Tests', () => {
  let req:any;
  let res:any;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('register', () => {
    it('should register a new user', async () => {
      req.body = { username: 'testuser', email: 'test@example.com', password: 'testpassword' };
      userService.users_register = jest.fn().mockReturnValue(true);
      await usersController.register(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ status: 200, message: 'User registered Successfully!' });
    });

    it('should return validation error if invalid data is provided', async () => {
      req.body = { invalidField: 'value' }; // Invalid data
      await usersController.register(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ status: 401, error: 'Validation error message' });
    });

    // Add more tests for other scenarios
  });

  // Add tests for other UserController functions (login, getAllUsers, getUserById)
});

describe('User Service Tests', () => {
  // Write tests for userService functions similarly using Jest mocks
});

