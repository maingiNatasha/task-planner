import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { retrieveTasks, createTask, modifyTask, removeTask, removeTasks } from "../controllers/taskController.js";
import { validate } from "../middleware/validationMiddleware.js";
import { createTaskValidator, updateTaskValidator, taskIdParamValidator, deleteTasksQueryValidator } from "../validators/taskValidator.js";

// Create router instance
const router = express.Router();

// Define routes
router.get("/", authMiddleware, retrieveTasks);
router.post("/", authMiddleware, createTaskValidator, validate, createTask);
router.patch("/:id", authMiddleware, taskIdParamValidator, updateTaskValidator, validate, modifyTask);
router.delete("/:id", authMiddleware, taskIdParamValidator, validate, removeTask);
router.delete("/", authMiddleware, deleteTasksQueryValidator, validate, removeTasks);

export default router;