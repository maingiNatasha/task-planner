import { body } from "express-validator";

export const profileValidator = [
    body("firstname")
        .trim()
        .isLength({ min: 1, max: 50 }).withMessage("Firstname must be 1-50 characters long")
        .matches(/^[a-zA-Z]+$/).withMessage("Firstname must contain letters only")
        .escape(), // sanitizes HTML characters
    body("lastname")
        .trim()
        .isLength({ min: 1, max: 50 }).withMessage("Lastname must be 1-50 characters long")
        .matches(/^[a-zA-Z]+$/).withMessage("Lastname must contain letters only")
        .escape(),
    body("username")
        .trim()
        .isLength({ min: 2, max: 30 }).withMessage("Username must be 2-30 characters")
        .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username can contain letters, numbers, and underscores only")
        .escape()
];