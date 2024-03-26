import express from "express";
import querriesController from "../controller/querries.controller";
import Jwt from "../helper/jwt";
import { isAdmin } from "../middleware/UserMiddleware";
const querriesRoutes = express.Router();
querriesRoutes.post("/querries", querriesController.createQuerries);
querriesRoutes.get("/:id/querries", Jwt.tokenValidation, isAdmin, querriesController.getAllQuerries);
querriesRoutes.delete("/querries/:id",Jwt.tokenValidation, isAdmin, querriesController.removeQuerries);



export default querriesRoutes;
