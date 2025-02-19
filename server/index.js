import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import dbConfig from './config/dbConfig/dbConfig.js';
import { ApiErrors } from './utils/apiErrors.js';
import gloalErrorMiddleware from './middlewares/globalerror.middleware.js';
const app = express();

app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    optionSuccessStatus:200
  })
);
app.use(morgan('dev'));
const PORT = process.env.PORT || 5000;
import userRouter from './routes/user.route.js';
import introRouter from './routes/intro.route.js';
import aboutRouter from './routes/about.route.js';
import contactRouter from './routes/contact.route.js';
import portfolioRouter from './routes/portfolio.route.js';
import experienceRouter from './routes/experience.route.js';
import projectRouter from './routes/project.route.js';
import certificationRouter from './routes/certication.route.js';
import contactMeRouter from './routes/contactMe.route.js';
app.use('/admin', userRouter);
app.use('/intro', introRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/portfolio', portfolioRouter);
app.use('/experience', experienceRouter);
app.use('/project', projectRouter);
app.use('/certification', certificationRouter);
app.use('/contact-me', contactMeRouter);
app.use('*', (req, res, next) => {
  next(new ApiErrors(404, `PAGE NOT FOUND FOR ${req.originalUrl}`));
});
app.use(gloalErrorMiddleware);
dbConfig()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database', err);
    process.exit();
  });
