import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { countSong } from "../controller/stat.controller.js";

const router =Router();

router.get("/",protectRoute,requireAdmin,countSong);


export default router;