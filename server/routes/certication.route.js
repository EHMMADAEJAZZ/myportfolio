import { Router } from "express";
import { addCertification, deleteCertification, updateCertification } from "../controllers/certification.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { protectedRoute } from "../middlewares/protected.middleware.js";
import restrictedTo from "../middlewares/restrictedTo.middleware.js";
const certificationRoutes = Router();

// Define routes
certificationRoutes
.post('/add',upload.single('certificationImage'),protectedRoute,restrictedTo("admin"), addCertification);
certificationRoutes
.put('/update/:id',upload.single('certificationImage'),protectedRoute,restrictedTo("admin"),updateCertification);
certificationRoutes
.delete('/delete/:id', protectedRoute,restrictedTo("admin"),deleteCertification);

export default certificationRoutes;