import express from "express";
import {reportAdmin} from "../controllers/userDashboardController.js"
import { protect } from "../middleware/protect.js";
const router=express.Router();

router.post("/reportAdmin",protect,reportAdmin);

export default router;