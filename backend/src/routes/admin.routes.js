import { Router } from "express";
import { checkAdmin, createSong, deleteSong,createAlbum, deleteAlbum  } from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";


const router=Router();

    router.use(protectRoute,requireAdmin)

    router.get("/check",checkAdmin);


router.post("/albums",createAlbum);
router.delete("/albums/:id",deleteAlbum);

router.post("/songs",createSong);
router.delete("/songs/:id",deleteSong)
export default router;