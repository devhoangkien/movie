import express from "express";
import { uploadAvatar, uploadMovie } from "../controllers/uploadController.js";
import { admin, protect } from "../middleware/auth.js";
import { uploader } from "../middleware/upload.js";

const router = express.Router();

router.route("/avatar").post(protect, uploader, uploadAvatar);
router.route("/movie").post(protect, admin, uploader, uploadMovie);

export default router;
