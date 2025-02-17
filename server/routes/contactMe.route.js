import { Router } from "express";
import {  deleteContactMe, getAllContactMessages, newContactMe } from "../controllers/contactme.controller.js";
import { protectedRoute } from "../middlewares/protected.middleware.js";
import restrictedTo from "../middlewares/restrictedTo.middleware.js";
const contactMeRoutes = Router()

contactMeRoutes
.post('/add',newContactMe);
contactMeRoutes
.get('/',protectedRoute,restrictedTo("admin"),getAllContactMessages);
contactMeRoutes
.delete('/delete/:id',protectedRoute,restrictedTo("admin"),deleteContactMe)
export default contactMeRoutes;