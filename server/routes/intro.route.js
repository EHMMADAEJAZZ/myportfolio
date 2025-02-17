import { Router } from 'express';
import {
  createIntro,
  deleteIntro,
  getIntro,
  updateIntro,
} from '../controllers/intro.controller.js';
import { protectedRoute } from '../middlewares/protected.middleware.js';
import restrictedTo from '../middlewares/restrictedTo.middleware.js';
const introRoutes = Router();

// Define routes
introRoutes.get('/', getIntro);
introRoutes.post('/add',protectedRoute,restrictedTo("admin"), createIntro);
introRoutes.put('/update/:id',protectedRoute,restrictedTo("admin"), updateIntro);
introRoutes.delete('/delete/id',protectedRoute,restrictedTo("admin"), deleteIntro);

export default introRoutes;
