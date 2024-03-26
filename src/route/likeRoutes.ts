import express,{Request,Response} from "express";
import likesController from "../controller/likes.controller";
import {isLoggedIn} from "../middleware/normalUser"
import Jwt from "../helper/jwt";
const likesRoutes = express.Router();

likesRoutes.post("/:id/likes",Jwt.tokenValidation,likesController.createLikes);
likesRoutes.get("/:id/likes",likesController.getLikesBasedOnBlogId);
likesRoutes.delete("/:id/likes/:id",Jwt.tokenValidation, likesController.removeLikes);


export default likesRoutes;