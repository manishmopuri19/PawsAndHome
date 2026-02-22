import express from "express";
import { protect } from "../middleware/protect.js";
import { getuserDetails,getUserAdoptions,updateProfile,getAllUserPostPets,getAllUserPostDocs} from "../controllers/userDashboardController.js";


const router=express.Router();
router.get("/userProfile",protect,getuserDetails);
router.get("/getUserAdoptions",protect,getUserAdoptions);
router.put("/updateUser",protect,updateProfile);
router.get("/getMypostPets",protect,getAllUserPostPets);
router.get("/getMyPostDocs",protect,getAllUserPostDocs);

export default router;