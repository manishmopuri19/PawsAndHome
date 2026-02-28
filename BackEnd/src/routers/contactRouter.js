import express from "express";
import {reportAdmin} from "../controllers/userDashboardController.js"
const router=express.Router();

router.post("/contactPost",reportAdmin);

export default router;