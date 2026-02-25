import { body, param } from "express-validator";

const allowedStatus = ["completed", "pending", "in_progress"];

export const createTaskValidator = [
    body("title")
        .trim()
        .isLength({ min: 1, max: 120 }).withMessage("Title must be 1-120 characters long")
        .escape(),
    body("description")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 1000 }).withMessage("Description must be at most 1000 characters long")
        .escape(),
    body("category")
        .optional()
        .trim(),
    body("deadline")
        .optional({ checkFalsy: true })
        .isISO8601().withMessage("Deadline must be a valid date")
        .toDate(),
    body("status")
        .optional({ checkFalsy: true })
        .isIn(allowedStatus).withMessage("Status is invalid")
];

export const updateTaskValidator = [
    body("title")
        .optional()
        .trim()
        .isLength({ min: 1, max: 120 }).withMessage("Title must be 1-120 characters long")
        .escape(),
    body("description")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 1000 }).withMessage("Description must be at most 1000 characters long")
        .escape(),
    body("category")
        .optional()
        .trim(),
    body("deadline")
        .optional({ checkFalsy: true })
        .isISO8601().withMessage("Deadline must be a valid date")
        .toDate(),
    body("status")
        .optional({ checkFalsy: true })
        .isIn(allowedStatus).withMessage("Status is invalid")
];

export const taskIdParamValidator = [
    param("id")
        .isInt({ min: 1 }).withMessage("Task id must be a positive integer")
        .toInt()
];