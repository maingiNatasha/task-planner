import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getProfile, saveProfile } from "../controllers/profileController.js";
import { validate } from "../middleware/validationMiddleware.js";
import { profileValidator } from "../validators/profileValidator.js";

// Create router instance
const router = express.Router();

// Define routes
router.get("/", authMiddleware, getProfile);
router.post("/", authMiddleware, profileValidator, validate, saveProfile); // handles both create/update

export default router;