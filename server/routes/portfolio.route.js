import { Router } from "express";
import { portfolio } from "../controllers/portfolio.controller.js";
const portfolioRoutes = Router();

portfolioRoutes
.get('/',portfolio);

export default portfolioRoutes;