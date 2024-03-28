import express,{Request,Response} from "express";
import likesController from "../controller/likes.controller";
import {isLoggedIn} from "../middleware/normalUser"
import Jwt from "../helper/jwt";
const likesRoutes = express.Router();

likesRoutes.post("/:id/likes", isLoggedIn,likesController.createLikes);
likesRoutes.get("/:id/likes",likesController.getLikesBasedOnBlogId);
likesRoutes.delete("/:id/likes/:id",isLoggedIn, likesController.removeLikes);


export default likesRoutes;