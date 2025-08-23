import { Router } from "express";
import { protectRoute} from "../middleware/auth.middleware.js";
import { getAllUser, getMessage } from "../controller/user.controller.js";

const router=Router();

router.use(protectRoute,);

router.get("/",getAllUser)
router.get("/messages/:userId",getMessage)


export default router;