import { useContext } from "react";
import TaskContext from "./TaskContext.jsx";

export function useTask() {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error("useTask must be used inside <TaskProvider>");
    }

    return context;
}