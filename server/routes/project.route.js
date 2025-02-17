import { Router } from "express";
import { addProject, deleteProject, getAllProjects, updateProject } from "../controllers/project.controller.js";
import upload from "../middlewares/multer.middleware.js";
import restrictedTo from "../middlewares/restrictedTo.middleware.js";
import { protectedRoute } from "../middlewares/protected.middleware.js";
const projectRoutes = Router();

// Define project routes
projectRoutes
.post('/add',upload.single("image") ,protectedRoute,restrictedTo("admin"),addProject)
projectRoutes
.get('/',protectedRoute,restrictedTo("admin"),getAllProjects);
projectRoutes
.put('/update/:id', upload.single('image'),protectedRoute,restrictedTo("admin"),updateProject);
projectRoutes
.delete('/delete/:id',protectedRoute,restrictedTo("admin"),deleteProject)
export default projectRoutes;