import { Router } from "express";
import { registerUser } from "../controllers/userController.js";
import { upload } from "../middlewares/multerMiddleware.js";

const router = Router()

router.route("/register").post(registerUser)

export default router;