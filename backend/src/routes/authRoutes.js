import express from "express";
import { register, login, logout, getCurrentUser } from "../controllers/authController.js";
import { forgotPassword, resetPassword } from "../controllers/passwordResetController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validationMiddleware.js";
import { registerValidator, loginValidator } from "../validators/authValidator.js";
import { forgotPasswordValidator, resetPasswordValidator } from "../validators/passwordResetValidator.js";

// Create router instance
const router = express.Router();

// Define routes
router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);
router.post("/logout", logout)
router.get("/user", authMiddleware, getCurrentUser);
router.post("/password/forgot", forgotPasswordValidator, validate, forgotPassword);
router.post("/password/reset", resetPasswordValidator, validate, resetPassword);

export default router;