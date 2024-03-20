import { Request, Response, NextFunction } from "express";
import userService from "../service/userService";
import joiValidation from "../helper/joi.validation";
import Jwt from "../helper/jwt";
import bcrypt from "bcrypt";

const register = async (req: Request, res: Response) => {
	try {
		const valid = joiValidation.validateUsersData(req.body);
		const users = await userService.users_register(req);
		if (users === false) {
			res.status(400).json({
				status: 400,
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
		res.status(400).json({
			status: 400,
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
					res.status(400).json({
						status: 400,
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
		res.status(400).json({
			status: 400,
			message: "User not found",
		});
	} else {
		res.status(200).json({
			status: 200,
			message: getAlluser,
		});
	}
};
export default {
	register,
	login,
	getAllusers,
};
