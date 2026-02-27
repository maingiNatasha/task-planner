import { getTasks, insertTask, updateTask, deleteTaskById, deleteTasksByFilters } from "../models/taskModel.js";
import { sendSuccess, sendError } from "../utils/response.js";

// Get user tasks
export const retrieveTasks = async (req, res) => {
    try {
        const tasks = await getTasks(req.user.id);

        if (!tasks || tasks.length === 0) {
            return sendSuccess(res, "No tasks created yet", { tasks: [] });
        }

        return sendSuccess(res, "Tasks retrieved successfully", { tasks });
    } catch (error) {
        console.error(error);
        return sendError(res, "Server error");
    }
};

// Create task
export const createTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const data = req.body;

        const insertId = await insertTask(userId, data);

        if (!insertId) {
            return sendError(res, "Failed to create task");
        }

        return sendSuccess(res, "Task created successfully", { taskId: insertId }, 201);
    } catch (error) {
        console.error(error);
        return sendError(res, "Server error");
    }
};

// Update task
export const modifyTask = async (req, res) => {
    try {
        const data = { ...req.body, id: req.params.id };

        const updateResult = await updateTask(data);

        if (!updateResult.ok) {
            if (updateResult.reason === "NO_FIELDS") {
                return sendError(res, "No fields provided to update", 400);
            }

            if (updateResult.reason === "NOT_FOUND") {
                return sendError(res, "Task not found", 404);
            }

            return sendError(res, "Failed to update task");
        }

        return sendSuccess(res, "Task updated successfully");
    } catch (error) {
        console.error(error);
        return sendError(res, "Server error");
    }
};

// Delete task
export const removeTask = async(req, res) => {
    try {
        const deleted = await deleteTaskById(req.params.id, req.user.id);

        if (!deleted) {
            return sendError(res, "Task not found", 404);
        }

        return sendSuccess(res, "Task deleted successfully");
    } catch (error) {
        console.error(error);
        return sendError(res, "Server error");
    }
};

// Delete tasks by status/category
export const removeTasks = async (req, res) => {
    try {
        const { status, category } = req.query;

        if (!status && !category) {
            return sendError(res, "Provide at least one filter: status or category", 400);
        }

        const deletedCount = await deleteTasksByFilters(req.user.id, { status, category });

        if (deletedCount === 0) {
            return sendError(res, "No tasks have been deleted", 400);
        }

        return sendSuccess(res, "Tasks deleted successfully", { deletedCount });
    } catch (error) {
        console.error(error);
        return sendError(res, "Server error");
    }
};