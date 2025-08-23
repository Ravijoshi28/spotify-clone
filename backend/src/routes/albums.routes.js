import { Router } from "express";
import { getAllAlbum,getAlbum } from "../controller/album.controller.js";
const router=Router();


router.get("/",getAllAlbum);
router.get("/:albumId",getAlbum)






export default router;