import { Router } from "express";
import {  updateAbout } from "../controllers/about.controler.js";
import { protectedRoute } from "../middlewares/protected.middleware.js";
const aboutRoutes = Router();

aboutRoutes.put("/update/:id",protectedRoute, updateAbout);
export default aboutRoutes;