import express from "express";
import {protect} from "../middleware/protect.js";
import { upload } from "../middleware/uploadMiddleware.js";
import {docCreate,getAllDocs,filterByCategory,specificDocDetailes} from "../controllers/docController.js";

const router=express.Router();

router.post("/postDoc",protect,upload.fields([{ name: "images", maxCount: 5 },{ name: "docs", maxCount: 5 }]),docCreate);
router.get("/getAllDocs",protect,getAllDocs);
router.get("/search",protect,filterByCategory);
router.get("/getDocById",protect,specificDocDetailes);

export default router;