import { useContext } from "react";
import TasksContext from "./TasksContext.jsx";

export function useTasks() {
    const context = useContext(TasksContext);

    if (!context) {
        throw new Error("useTask must be used inside <TaskProvider>");
    }

    return context;
}