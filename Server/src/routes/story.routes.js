import  express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { createStory, getAuthUsersStory, getStory } from "../controllers/story.controller.js";
const router = express.Router();


router.post("/createStory", protectRoute, createStory);
router.get("/stories", protectRoute, getStory);
router.get("/MyStory", protectRoute, getAuthUsersStory);


export default router