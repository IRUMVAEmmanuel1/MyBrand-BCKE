import { Request, Response } from "express";
import userService from "../service/userService";
import joiValidation from "../helper/joi.validation";
import Jwt from "../helper/jwt";
import bcrypt from "bcrypt";

const register = async (req: Request, res: Response) => {
  try {
    const valid = joiValidation.validateUsersData(req.body);
    const users = await userService.users_register(req);
    if (users === false) {
      res.status(401).json({
        status: 401,
        error: "User exist ",
        message: valid.error?.message,
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "User registered Successfully!",
      });
    }
  } catch (error: any) {
    res.status(401).json({
      status: 401,
      error: error.message,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const valid = joiValidation.validateUsersData(req.body);
    const { password } = req.body;
    const user = await userService.userLogin(req);
    if (!user) {
      res.status(404).json({
        status: 404,
        message: "User Not Found !",
      });
      return; // Return to exit the function after sending the response
    }

    // Compare passwords asynchronously
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({
        status: 401,
        message: "Wrong Email or Password!",
      });
      return; // Return to exit the function after sending the response
    }

    // Generate and send access token
    const accessToken = Jwt.createToken(user);
    res.cookie("access-token", accessToken, {
      maxAge: 60 * 60 * 24 * 31 * 1000,
      httpOnly: true,
    });
    res.status(200).json({
      status: 200,
      token: accessToken,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const getAllusers = async (req: Request, res: Response) => {
  try {
    const getAlluser = await userService.retrieve();
    if (!getAlluser) {
      res.status(401).json({
        status: 401,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        status: 200,
        message: getAlluser,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await userService.getUserById(userId);
    if (!user) {
      res.status(404).json({
        status: 404,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        status: 200,
        message: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export default {
  register,
  login,
  getAllusers,
  getUserById,
};