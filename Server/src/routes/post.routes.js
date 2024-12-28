import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { createPost, getPosts, likePost } from "../controllers/post.controller.js";
const router = express.Router();

router.post("/createPost", protectRoute, createPost);
router.get("/getPost", protectRoute, getPosts);
router.put("/like/:postId", protectRoute, likePost);


export default router;
