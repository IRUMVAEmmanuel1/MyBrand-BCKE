import { Request } from "express";
import * as bcrypt from "bcrypt";
import Users from "../models/user";
import joiValidation from "../helper/joi.validation";

const users_register = async (req: Request) => {
    try {
        const valid = joiValidation.validateUsersData(req.body);
        const { username, email, password } = req.body;
        const registered_user = await Users.findOne({
            $or: [{ username: username }, { email: email }],
        });
        if (registered_user) {
            return false;
        } else if (valid.error) {
            return false;
        } else {
            const hash = await bcrypt.hash(password, 10);
            const newUser = new Users({
                username: username,
                email: email,
                password: hash,
            });
            await newUser.save();
            return newUser;
        }
    } catch (err: any) {
        throw new Error(err.message);
    }
};

const userLogin = async (req: Request) => {
    try {
        const valid = joiValidation.validateUsersData(req.body);
        const { email } = req.body;
        const user: any = await Users.findOne({ email: email });
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
const getUserById = async (userId: string) => {
    try {
        const user = await Users.findById(userId);
        return user;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Retrieve all users in the system
const retrieve = async () => {
    try {
        return await Users.find().select("-password");
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

export default {
    users_register,
    userLogin,
    gettingLoggedInUser,
    retrieve,
    getUserById,
};
