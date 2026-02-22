import express from "express";
import {createPet,getAllPets,searchByFilters,getSpecificPet,getHomePets} from "../controllers/petController.js";
import {protect} from "../middleware/protect.js";
import {upload} from "../middleware/uploadMiddleware.js"

const router=express.Router();

router.post("/petUpload",protect,upload.array("images", 5),createPet)
router.get("/getAll",protect,getAllPets)
router.get("/search",protect,searchByFilters)
router.get("/getPetById/:id",protect,getSpecificPet)
router.get("/homeanimals",protect,getHomePets)

export default router;