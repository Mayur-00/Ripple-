import express from "express";
import { getPostsForFeed, getUsersForSuggestons } from "../controllers/feed.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/posts" ,protectRoute, getPostsForFeed);
router.get("/suggestedUsers" ,protectRoute,  getUsersForSuggestons);

export default router

