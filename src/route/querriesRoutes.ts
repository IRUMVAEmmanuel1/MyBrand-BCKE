import express from "express";
import querriesController from "../controller/querries.controller";
import Jwt from "../helper/jwt";
import { isAdmin } from "../middleware/UserMiddleware";
import { isLoggedIn } from "../middleware/normalUser";
const querriesRoutes = express.Router();
querriesRoutes.post("/querries", querriesController.createQuerries);
querriesRoutes.get("/:id/querries", isLoggedIn, isAdmin, querriesController.getAllQuerries);
querriesRoutes.delete("/querries/:id",isLoggedIn, isAdmin, querriesController.removeQuerries);



export default querriesRoutes;
