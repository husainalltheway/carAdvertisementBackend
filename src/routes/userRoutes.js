import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/userController.js";
import { uploadAdvertisementFile } from "../controllers/fileController.js";
import { upload } from "../middlewares/multerMiddleware.js";
import { verifyJWT } from "../middlewares/authentication.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/uploadAdvertisementFile").post(upload.fields([{name: 'advertisementFile', maxCount: 1}]),uploadAdvertisementFile)
router.route("/login").post(loginUser)


// secured routes
router.route("logout").post(verifyJWT, logoutUser)

export default router;