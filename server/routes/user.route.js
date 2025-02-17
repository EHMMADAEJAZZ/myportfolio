import {Router} from "express";
import { auth, changePassword, forgetPassword, getMe, login, logout, refreshAccessToken, registerUser, resetPassword, verifyEmail } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/protected.middleware.js";

const userRoutes = Router();

// Define user routes
userRoutes.post("/register",registerUser);
userRoutes.post('/verify-email',verifyEmail)
userRoutes.post("/login",login);
userRoutes.post("/change/password",forgetPassword)
userRoutes.post("/reset-password",resetPassword)
userRoutes.post("/logout",protectedRoute,logout);
userRoutes.post("/refresh-token",protectedRoute,refreshAccessToken);
userRoutes.get("/auth",protectedRoute,auth)
userRoutes.get("/profile",protectedRoute,getMe)
userRoutes.post("/change-password",protectedRoute,changePassword)


export default userRoutes;

