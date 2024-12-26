import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { createPost, getPosts } from "../controllers/post.controller.js";
const router = express.Router();

router.post("/createPost", protectRoute, createPost);
router.get("/getPost", protectRoute, getPosts);


export default router;
