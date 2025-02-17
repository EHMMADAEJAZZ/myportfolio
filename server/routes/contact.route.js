import { Router } from "express";
import { getContact, updateContact } from "../controllers/contact.controller.js";
import { protectedRoute } from "../middlewares/protected.middleware.js";
import restrictedTo from "../middlewares/restrictedTo.middleware.js";

const contactRoutes = Router();

// GET /contacts
contactRoutes.get("/", getContact);
contactRoutes
.put('/update/:id',protectedRoute,restrictedTo("admin"),updateContact)

export default contactRoutes;