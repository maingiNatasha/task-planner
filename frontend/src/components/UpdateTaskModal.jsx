import { useState } from 'react';
import { useTasksActions } from '../tasks/useTasks.js';
import { toast } from "react-toastify";
import Modal from './Modal.jsx';
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiSolidError } from "react-icons/bi";

const categoryOptions = [
    { value: "other", label: "Other" },
    { value: "work", label: "Work" },
    { value: "personal", label: "Personal" },
    { value: "study", label: "Study" },
    { value: "health", label: "Health" }
];

const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" }
];

function UpdateTaskModal({ task, onClose }) {
    // Functions to convert dates to YYYY-MM-DD format
    const toDateInput = (value) => (value ? String(value).slice(0,10) : "");
    const dateToYMD = (date) => (date ? date.toLocaleDateString("en-CA") : "");

    const initialForm = {
        title: task.title ?? "",
        description: task.description ?? "",
        category: task.category ?? "other",
        status: task.status ?? "pending",
        deadline: toDateInput(task.deadline)
    };

    const { updateTask } = useTasksActions();
    const [form, setForm] = useState(initialForm);
    const [selectedDeadline, setSelectedDeadline] = useState(initialForm.deadline ? new Date(initialForm.deadline) : null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    };

    const buildUpdatePayload = () => {
        const current = {
            ...form,
            title: form.title.trim(),
            description: form.description.trim(),
            deadline: dateToYMD(selectedDeadline)
        };

        const original = {
            title: task.title ?? "",
            description: task.description ?? "",
            category: task.category ?? "other",
            status: task.status ?? "pending",
            deadline: toDateInput(task.deadline)
        };

        // Compare current form values to original task values to find changed values that need to be updated
        const changed = {};

        for (const key of Object.keys(current)) {
            if (current[key] !== original[key]) {
                changed[key] = current[key]
            }
        }

        return changed;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const payload = buildUpdatePayload();
        if (Object.keys(payload).length === 0) {
            setError("No changes to update");
            return;
        }

        setSubmitting(true);

        try {
            const res = await updateTask(task.id, payload);
            toast.success(res?.message || "Task updated successfully");
            onClose();
        } catch (err) {
            setError(err?.message || "Failed to update task");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal title={"Update Task"} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        maxLength={120}
                        required
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                        placeholder="Task title"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        maxLength={1000}
                        rows={3}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                        placeholder="Optional description"
                    />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Category</label>
                        <Select
                            options={categoryOptions}
                            value={categoryOptions.find((opt) => opt.value === form.category)}
                            onChange={(opt) => setForm((prev) => ({ ...prev, category: opt?.value || "other" }))}
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
                            styles={{
                            control: (base, state) => ({
                                ...base,
                                fontSize: "0.875rem", // text-sm
                                borderColor: state.isFocused ? "#a855f7" : "#cbd5e1",
                                boxShadow: state.isFocused ? "0 0 0 2px rgba(168,85,247,0.15)" : "none",
                                minHeight: 42
                            }),
                            option: (base, state) => ({
                                ...base,
                                fontSize: "0.875rem", // text-sm
                                backgroundColor: state.isSelected ? "#7e22ce" : state.isFocused ? "#f3e8ff" : "#fff",
                                color: state.isSelected ? "#fff" : "#334155"
                            }),
                            menuPortal: (base) => ({ ...base, zIndex: 9999 })
                            }}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
                        <Select
                            options={statusOptions}
                            value={statusOptions.find((opt) => opt.value === form.status)}
                            onChange={(opt) => setForm((prev) => ({ ...prev, status: opt?.value || "pending" }))}
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
                            styles={{
                            control: (base, state) => ({
                                ...base,
                                fontSize: "0.875rem", // text-sm
                                borderColor: state.isFocused ? "#a855f7" : "#cbd5e1",
                                boxShadow: state.isFocused ? "0 0 0 2px rgba(168,85,247,0.15)" : "none",
                                minHeight: 42
                            }),
                            option: (base, state) => ({
                                ...base,
                                fontSize: "0.875rem", // text-sm
                                backgroundColor: state.isSelected ? "#7e22ce" : state.isFocused ? "#f3e8ff" : "#fff",
                                color: state.isSelected ? "#fff" : "#334155"
                            }),
                            menuPortal: (base) => ({ ...base, zIndex: 9999 })
                            }}
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Deadline</label>
                    <DatePicker
                        selected={selectedDeadline}
                        onChange={(date) => setSelectedDeadline(date)}
                        dateFormat="yyyy-MM-dd"
                        minDate={new Date()}
                        placeholderText="Select a deadline"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                        isClearable
                        withPortal
                        portalId="root-datepicker"
                    />
                </div>

                {error && (
                    <div className='flex items-center gap-1 text-red-600'>
                        <BiSolidError />
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium cursor-pointer hover:bg-purple-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="rounded-lg bg-purple-700 px-4 py-2 text-sm font-semibold text-white cursor-pointer hover:bg-purple-800 disabled:opacity-50"
                    >
                        {submitting ? "Updating..." : "Update Task"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default UpdateTaskModal;