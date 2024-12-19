import express from "express";
import { updateBio, updateProfilePic } from "../controllers/profile.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.put("/update-profilePic", protectRoute ,updateProfilePic);
router.put("/update-bio", protectRoute, updateBio)

export default router;


