// userController.ts

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
    } else {
      bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          res.status(401).json({
            status: 401,
            message: "Wrong Email or Password!",
          });
        } else {
          const accessToken = Jwt.createToken(user);
          res.cookie("access-token", accessToken, {
            maxAge: 60 * 60 * 24 * 31 * 1000,
            httpOnly: true,
          });
          res.status(200).json({
            status: 200,
            token: accessToken,
          });
        }
      });
    }
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const getAllusers = async (req: Request, res: Response) => {
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
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
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
      message: "Bad Request"
    });
  }
};

const updateUserById = async (req: Request, res: Response) => {
	const user = await userService.updateUser(req.params.id, req.body);
	if (!user) {
		res.status(404).json({ status: 404, user: " User Not Found" });
	} else {
		res.status(200).json({
			status: 200,
			message: "User Updated Successfully",
			
		});
	}
};

const deleteUser = async (req: Request, res: Response) => {
  try{
      const user: any = await userService.removeUser(req.params.id);
      return res.status(200).json({
          status: "success",
          message: "User deleted successfully"
      });
  } catch(err: any){
      res.status(400).json({
          status: "Error",
          message: err.message
      })
  }
}
export default {
  register,
  login,
  getAllusers,
  getUserById,
  deleteUser,
  updateUserById,
 

};
