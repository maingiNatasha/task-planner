import { getUserProfile, saveUserProfile } from "../models/userModel.js";
import { sendSuccess, sendError } from "../utils/response.js";

// Get user profile
export const getProfile = async (req, res) => {
    try {
        // Retrieve profile
        const profile = await getUserProfile(req.user.id);

        if (!profile) {
            return sendSuccess(res, "Profile not created yet", { profile: { firstname: "", lastname: "", username: "", role: "" } });
        }

        return sendSuccess(res, "Profile retrieved successfully", { profile });
    } catch (error) {
        console.error(error);
        return sendError(res, "Server error");
    }
};

// Save user profile
export const saveProfile = async (req, res) => {
    try {
        // Create profile
        const profile = await saveUserProfile(req.user.id, req.body);
        return sendSuccess(res, "Profile created successfully", { profile }, 201);
    } catch (error) {
        console.error(error);
        return sendError(res, "Server error");
    }
};