import jwt from "jsonwebtoken";
import middleware from "../middleware/authMiddleware";
import userModel from "../models/user";

describe("Authentication Middleware Tests", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 if access token is missing", async () => {
    // Mock the request with no access token
    await middleware.tokenValidation(req, res, next);

    // Verify that the correct response is sent
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Login with your account First" });
  });

  it("should authenticate and set currentUser if valid token is provided", async () => {
    // Mock a valid access token
    const mockToken = jwt.sign({ email: "test@example.com" }, "whatyouseeiswhatyouget");
    req.cookies = { "access-token": mockToken };

    // Mock the user found in the database
    const mockUser = { email: "test@example.com" };
    userModel.findOne = jest.fn().mockResolvedValue(mockUser);

    // Call the middleware
    await middleware.tokenValidation(req, res, next);

    // Verify that the user is correctly set in the request and the next function is called
    expect(userModel.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(req.currentUser).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
  });

  it("should return 401 if token verification fails", async () => {
    // Mock an invalid access token
    const mockToken = "invalid_token";
    req.cookies = { "access-token": mockToken };

    // Mock JWT verify to throw an error
    jwt.verify = jest.fn().mockImplementationOnce(() => {
      throw new Error("Invalid token");
    });

    // Call the middleware
    await middleware.tokenValidation(req, res, next);

    // Verify that the correct response is sent
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Error: Invalid token" });
  });
});
