import express from "express";
import { checkAuth, login, logout, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
const router= express.Router();

router.post("/login", login );

router.post("/signup", signup);

router.post("/logout", logout);

router.post("/check",protectRoute, checkAuth);

router.put("/update-profile");

export default router

