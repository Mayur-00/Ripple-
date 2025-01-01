import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { CreateComment, createPost, GetCommnets, getPosts, likePost } from "../controllers/post.controller.js";
const router = express.Router();

router.post("/createPost", protectRoute, createPost);
router.get("/getPost", protectRoute, getPosts);
router.put("/like/:postId", protectRoute, likePost);
router.post("/addComment/:postId", protectRoute, CreateComment);
router.get("/getComments/:postId", protectRoute, GetCommnets);


export default router;
