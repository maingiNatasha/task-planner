import { verifyToken } from "../utils/token.js";
import { sendError } from "../utils/response.js";

/**
 * Middleware to protect routes
 * Checks for a valid JWT token in the cookies
 */

export const authMiddleware = (req, res, next) => {
    // Retrieve the token from cookies
    const token = req.cookies?.access_token;
    if (!token) return sendError(res, "Unauthorized", 401);

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return sendError(res, "Token expired. Please log in again.", 401);
        }

        return sendError(res, "Invalid token", 401);
    }
};