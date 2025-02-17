import { Router } from 'express';
import {
  deleteExperience,
  getAllExperiences,
  newExperience,
  updateExperiences,
} from '../controllers/experience.controller.js';
import { protectedRoute } from '../middlewares/protected.middleware.js';
import restrictedTo from '../middlewares/restrictedTo.middleware.js';
const experienceRoutes = Router();

experienceRoutes.get('/',protectedRoute,restrictedTo("admin"), getAllExperiences);
experienceRoutes.post('/add',protectedRoute,restrictedTo("admin"), newExperience);
experienceRoutes.put('/update/:id',protectedRoute,restrictedTo("admin"), updateExperiences);

experienceRoutes.delete('/delete/:id',protectedRoute,restrictedTo("admin"),deleteExperience);

export default experienceRoutes;
