import { Router } from "express";
import { getAllSongs, getFeaturedSong, madeForU, trendingSong } from "../controller/song.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router =Router();
router.get("/",protectRoute,requireAdmin,getAllSongs)
router.get("/featured",getFeaturedSong);
router.get("/made-for-you",madeForU);
router.get("/trending",trendingSong);





export default router;