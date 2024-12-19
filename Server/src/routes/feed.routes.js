import express from "express";
import { getPostsForFeed } from "../controllers/feed.controller.js";
const router = express.Router();

router.get("feed/posts" , getPostsForFeed);

export default router

