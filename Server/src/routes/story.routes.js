import  express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { createStory, getStory } from "../controllers/story.controller.js";
const router = express.Router();


router.post("/createStory", protectRoute, createStory);
router.post("/stories", protectRoute, getStory);


export default router