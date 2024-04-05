import express from "express";
import Jwt from "../helper/jwt";
import usersController from "../controller/users.controller";
import { isLoggedIn } from "../middleware/normalUser";
import { isAdmin } from "../middleware/UserMiddleware";

const usersRoutes = express.Router();
usersRoutes.post("/users", usersController.register);
usersRoutes.post("/users/login", usersController.login);
usersRoutes.get("/users", isLoggedIn,usersController.getAllusers);
usersRoutes.get("/users/:id", isLoggedIn, isAdmin, usersController.getUserById);
usersRoutes.patch("/users/:id", isLoggedIn, isAdmin, usersController.updateUserById);
usersRoutes.delete("/users/:id", isLoggedIn, isAdmin ,usersController.deleteUser);
export default usersRoutes;
