import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * Generate a JWT token
 * @param {Object} payload - Data to include in the token (e.g., user id, email)
 * @param {string} expiresIn - Optional token expiration, defaults to JWT_EXPIRES_IN in .env
 * @returns {string} - JWT token
 */
export const generateToken = (payload, expiresIn = process.env.JWT_EXPIRES_IN) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

/**
 * Verify a JWT token
 * @param {string} token - JWT token from client
 * @returns {Object} - Decoded payload
 * @throws {Error} - Throws if token is invalid or expired
 */
export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
