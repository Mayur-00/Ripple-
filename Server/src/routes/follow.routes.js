import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { followUser } from "../controllers/follow.controller.js";
const router = express.Router();


router.post("follow/:targetedUserid", protectRoute, followUser );
router.post("remove/:targetedUserid", protectRoute,  );


export default router