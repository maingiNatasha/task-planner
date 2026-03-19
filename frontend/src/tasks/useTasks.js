import { useContext } from "react";
import { TasksActionsContext, TasksStateContext } from "./TasksContext.jsx";

export const useTasksState = () => useContext(TasksStateContext);
export const useTasksActions = () => useContext(TasksActionsContext);