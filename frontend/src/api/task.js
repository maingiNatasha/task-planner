import api from "./client.js";

export const taskApi = {
    getTasks: () => api.get("/tasks"),
    createTask: (payload) => api.post("/tasks", payload),
    updateTask: (id, payload) => api.patch(`/tasks/${id}`, payload),
    deleteTask: (id) => api.delete(`/tasks/${id}`),
    deleteTasks: (filters = {}) => api.delete("/tasks", { params: filters })
};