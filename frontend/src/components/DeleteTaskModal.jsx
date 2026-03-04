import { useState } from "react";
import Modal from "./Modal.jsx";
import { useTask } from "../task/useTask.js";
import { toast } from "react-toastify";

function DeleteTaskModal({ taskId, onClose}) {
    const { deleteTask } = useTask();
    const [submitting, setSubmitting] = useState(false);

    const handleDelete = async (taskId) => {
        if (!taskId) return;

        setSubmitting(true);

        try {
            const res = await deleteTask(taskId);
            toast.success(res?.message || "Task deleted successfully");
            onClose();
        } catch (err) {
            toast.error(err?.message || "Failed to delete task");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal title={"Delete Task"} onClose={onClose}>
            <p className="text-sm mb-1">Are you sure you want to delete this task?</p>
            <div className="flex justify-end gap-2 pt-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium cursor-pointer hover:bg-purple-50"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    disabled={submitting}
                    onClick={() => handleDelete(taskId)}
                    className="rounded-lg bg-purple-700 px-4 py-2 text-sm font-semibold text-white cursor-pointer hover:bg-purple-800 disabled:opacity-50"
                >
                    {submitting ? "Deleting..." : "Delete Task"}
                </button>
            </div>
        </Modal>
    );
}

export default DeleteTaskModal;