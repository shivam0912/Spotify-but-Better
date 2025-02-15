import {Router} from "express";
import {getAllStats} from "../controllers/stats.controller.js";
import {protectRoute,requireAdmin} from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/',protectRoute,requireAdmin, getAllStats);

export default router;