import { Router } from "express";
import { callback } from "../controller/auth.controller.js";

const router=Router();

router.post("/callback",callback)

export default router;