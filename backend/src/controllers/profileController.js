import { getUserProfile, saveUserProfile } from "../models/userModel.js";
import { sendSuccess, sendError } from "../utils/response.js";

const EMPTY_PROFILE = {
    firstname: "",
    lastname: "",
    username: "",
    role: ""
};

const normalizeProfile = (profile) => {
    if (!profile) return EMPTY_PROFILE;

    return {
        firstname: profile.firstname ?? profile.first_name ?? "",
        lastname: profile.lastname ?? profile.last_name ?? "",
        username: profile.username ?? "",
        role: profile.role ?? ""
    };
};

// Get user profile
export const getProfile = async (req, res) => {
    try {
        const profile = await getUserProfile(req.user.id);
        const normalizedProfile = normalizeProfile(profile);

        if (!profile) {
            return sendSuccess(res, "Profile not created yet", { profile: normalizedProfile });
        }

        return sendSuccess(res, "Profile retrieved successfully", { profile: normalizedProfile });
    } catch (error) {
        console.error(error);
        return sendError(res, "Server error");
    }
};

// Create or update user profile
export const saveProfile = async (req, res) => {
    try {
        const existingProfile = await getUserProfile(req.user.id);

        const payload = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username
        };

        const profile = await saveUserProfile(req.user.id, payload);
        const normalizedProfile = normalizeProfile(profile);

        const isUpdate = !!existingProfile;
        const status = isUpdate ? 200 : 201;
        const message = isUpdate ? "Profile updated successfully" : "Profile created successfully";

        return sendSuccess(res, message, { profile: normalizedProfile }, status);
    } catch (error) {
        console.error(error);
        return sendError(res, "Server error");
    }
};
