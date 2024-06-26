import { Request } from "express";
import * as bcrypt from "bcrypt";
import Users from "../models/user";
import joiValidation from "../helper/joi.validation";


const users_register = async (req: Request) => {
	try {
		const valid = joiValidation.validateUsersData(req.body);
		const { username, email, password } = req.body;
		const registerd_user = await Users.findOne({
			$or: [{ username: username }, { email: email }, { password: password }],
		});
		if (registerd_user) {
			return false;
		} else if (valid.error) {
			return false;
		} else {
			
			
			await bcrypt.hash(password, 10).then((hash) => {
				const users = new Users({
					username: username,
					email: email,
					password: hash,
				});
				users.save();
				return users;
			});
		}
	} catch (err: any) {
		throw new Error(err.message);
	}
};

const userLogin = async (req: Request) => {
	try {
		const valid = joiValidation.validateUsersData(req.body);
		const { email } = req.body;
		const user: any = Users.findOne({ email: email });
		if (!user) {
			return false;
		} else {
			return user;
		}
	} catch (err: any) {
		throw new Error(err.message);
	}
};

// Retrieve user by ID
const getUserById = async (id: string) => {
	try {
		const user = await Users.findById(id);
		return user;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

// Retriving all users in the system
const retrieve = async () => {
	try {
		return await Users.find().select('-password');
	} catch (error: any) {
		throw new Error(error.message);
	}
};

const gettingLoggedInUser = async () => {
	try {
		const loggedIn = await Users.find();
		return loggedIn;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
const updateUser = async (id: string, user: any) => {
	const newUser = await Users.findByIdAndUpdate(id, user);
	return newUser
}

const removeUser = async (id: string) => {
	const singleUser = await Users.findByIdAndDelete(id);
	if(!singleUser){
			throw new Error("User Not Found");
	}
	return
}
export default{
	users_register,
	userLogin,
	gettingLoggedInUser,
	retrieve,
	getUserById,
	updateUser,
	removeUser
};
