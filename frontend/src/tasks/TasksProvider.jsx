import { useCallback, useEffect, useState, useMemo } from "react";
import { useAuthState } from "../auth/useAuth.js";
import { taskApi } from "../api/task.js";
import { TasksStateContext, TasksActionsContext } from "./TasksContext.jsx";

export function TasksProvider({ children }) {
    const { user, isAuthenticated, loading: authLoading } = useAuthState();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const userId = user?.id;

    const fetchTasks = useCallback(async () => {
        if (!isAuthenticated || !userId) {
            setTasks([]);
            setError(null);
            setLoading(false);
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
    }, [isAuthenticated, userId]);

    const createTask = useCallback(async (payload) => {
        const res = await taskApi.createTask(payload);
        await fetchTasks();
        return res;
    }, [fetchTasks]);

    const updateTask = useCallback(async (id, payload) => {
        const res = await taskApi.updateTask(id, payload);
        await fetchTasks();
        return res;
    }, [fetchTasks]);

    const deleteTask = useCallback(async (id) => {
        const res = await taskApi.deleteTask(id);
        await fetchTasks();
        return res;
    }, [fetchTasks]);

    const deleteTasks = useCallback(async (filters) => {
        const res = await taskApi.deleteTasks(filters);
        await fetchTasks();
        return res;
    }, [fetchTasks]);

    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            fetchTasks();
        } else if (!isAuthenticated) {
            setTasks([]);
            setError(null);
        }

    }, [authLoading, isAuthenticated, fetchTasks]);

    const stateValue = useMemo(() => ({
        tasks,
        loading,
        error
    }), [tasks, loading, error]);

    const actionsValue = useMemo(() => ({
        refetch: fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        deleteTasks
    }), [fetchTasks, createTask, updateTask, deleteTask, deleteTasks]);

    return (
        <TasksStateContext.Provider value={stateValue}>
            <TasksActionsContext.Provider value={actionsValue}>
                {children}
            </TasksActionsContext.Provider>
        </TasksStateContext.Provider>
    );
}