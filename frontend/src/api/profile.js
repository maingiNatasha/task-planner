import api from "./client.js";

export const profileApi = {
    getProfile: () => api.get("/profile"),
    saveProfile: (payload) => api.post("/profile", payload)
};