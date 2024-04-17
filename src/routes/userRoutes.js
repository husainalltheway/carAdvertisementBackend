import { Router } from "express";
import { registerUser } from "../controllers/userController.js";
import { uploadAdvertisementFile } from "../controllers/fileController.js";
import { upload } from "../middlewares/multerMiddleware.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/uploadAdvertisementFile").post(upload.fields([{name: 'advertisementFile', maxCount: 1}]),uploadAdvertisementFile)

export default router;