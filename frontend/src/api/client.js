import axios from "axios";
import { triggerUnauthorized } from "../auth/authEvents.js";

// Create axios client (cookie-based auth)
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
    withCredentials: true, // Required for cookie auth
    headers: {
        "Content-Type": "application/json"
    }
});

let handled = false; // global guard to avoid repeated 401 handling loops

// Add response interceptor
api.interceptors.response.use(
    (response) => {
        // Any successful response resets the 401 guard
        handled = false;
        return response.data;
    },
    (error) => {
        const status = error.response?.status;
        const url = error.config?.url || "";
        const serverMessage = error.response?.data?.message || error.response?.data?.error;

        // Don't globally redirect on bootstrap or public routes
        const ignore401Paths = ["/auth/user", "/auth/login", "/auth/register", "/auth/forgot-password", "/auth/reset-password"];
        const shouldIgnore401 = ignore401Paths.some((path) => url.includes(path));

        if (status === 401 && !handled && !shouldIgnore401) {
            handled = true;
            const message = serverMessage === "Token expired. Please log in again." ? "Session expired. Please log in again." : "You've been logged out. Please log in again.";
            // Delegate the user-facing response to auth provider
            triggerUnauthorized({ message });
        }

        // Normalize axios errors for callers
        const err = {
            status: error.response?.status,
            message: error.response?.data?.message || error.response?.data?.error || error.message,
            data: error.response?.data
        };

        return Promise.reject(err);
    }
);

export default api;
