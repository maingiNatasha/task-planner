import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth.js";
import { taskApi } from "../api/task.js";
import TaskContext from "./TaskContext.jsx";

export function TaskProvider({ children }) {
    const { user, isAuthenticated, loading: authLoading } = useAuth();

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const clearTasks = useCallback(() => {
        setTasks([]);
        setError(null);
        setLoading(false);
    }, []);

    const fetchTasks = useCallback(async () => {
        if (!isAuthenticated || !user?.id) {
            clearTasks();
            return [];
        }

        setLoading(true);
        setError(null);

        try {
            const res = await taskApi.getTasks();
            const fetchedTasks = res?.data?.tasks ?? [];
            setTasks(fetchedTasks);
            return fetchedTasks;
        } catch (err) {
            setError(err);
            setTasks([]);
            return [];
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, user?.id, clearTasks]);

    const createTask = useCallback(() => async (payload) => {
        const res = await taskApi.createTask(payload);
        await fetchTasks();
        return res;
    }, [fetchTasks]);

    const updateTask = useCallback(() => async (id, payload) => {
        const res = await taskApi.updateTask(id, payload);
        await fetchTasks();
        return res;
    }, [fetchTasks]);

    const deleteTask = useCallback(() => async (id) => {
        const res = await taskApi.deleteTask(id);
        await fetchTasks();
        return res;
    }, [fetchTasks]);

    const deleteTasks = useCallback(() =>  async (filters) => {
        const res = await taskApi.deleteTasks(filters);
        await fetchTasks();
        return res;
    }, [fetchTasks]);

    useEffect(() => {
        if (authLoading) {
            setLoading(true);
            return;
        }

        fetchTasks();
    }, [authLoading, fetchTasks]);

    const value = {
        tasks,
        loading,
        error,
        refetch: fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        deleteTasks
    };

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
}