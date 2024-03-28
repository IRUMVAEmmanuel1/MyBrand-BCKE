import express,{Request,Response} from "express";
import likesController from "../controller/likes.controller";
import {isLoggedIn} from "../middleware/normalUser"
import Jwt from "../helper/jwt";
const likesRoutes = express.Router();

likesRoutes.post("/:id/likes", isLoggedIn,likesController.likeOrDislike);
likesRoutes.get("/:id/likes",likesController.getLikesBasedOnBlogId);



export default likesRoutes;