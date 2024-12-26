import express from "express";
import { getPostsForFeed, getUsersForSuggestons } from "../controllers/feed.controller.js";
const router = express.Router();

router.get("/posts" , getPostsForFeed);
router.get("/users" , getUsersForSuggestons);

export default router

