import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { retrieveTasks, createTask, modifyTask } from "../controllers/taskController.js";
import { validate } from "../middleware/validationMiddleware.js";
import { createTaskValidator, updateTaskValidator, taskIdParamValidator } from "../validators/taskValidator.js";

// Create router instance
const router = express.Router();

// Define routes
router.get("/", authMiddleware, retrieveTasks);
router.post("/", authMiddleware, createTaskValidator, validate, createTask);
router.patch("/:id", authMiddleware, taskIdParamValidator, updateTaskValidator, validate, modifyTask);

export default router;