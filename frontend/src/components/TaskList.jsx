import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { MdOutlineCheckBoxOutlineBlank, MdCheckBox, MdOutlineEvent } from "react-icons/md";

const formatDeadline = (value) => {
    if (!value) return "";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";

    return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    }).format(date);
};

const isOverdue = (value) => {
    if (!value) return false;

    const due = new Date(value);
    const now = new Date();
    due.setHours(23, 59, 59, 999); // consider overdue after due day ends

    return due < now;
};

function TaskList({ tasks, onDeleteTask, onToggleTaskStatus }) {
    return (
        <ul className='mt-6 space-y-4'>
            {tasks.map((task) => {
                const isCompleted = task.status === "completed";

                return (
                    <li key={task.id} className='rounded-xl border border-white/60 bg-purple-50/85 p-4 shadow-lg hover:bg-white hover:shadow-xl'>
                        <div className='flex items-start justify-between gap-4'>
                            <div className='flex items-start gap-3'>
                                <button
                                    type='button'
                                    aria-label={isCompleted ? "Mark task as pending" : "Mark task as completed"}
                                    className="cursor-pointer pt-0.5 hover:text-purple-800"
                                    onClick={() => onToggleTaskStatus(task)}
                                >
                                    {isCompleted ? <MdCheckBox size={22}/> : <MdOutlineCheckBoxOutlineBlank size={22}/>}
                                </button>
                                <div>
                                    <h2 className='font-semibold'>{task.title || "(Untitled task)"}</h2>
                                    <p className='text-sm text-slate-600'>{task.description || "No description"}</p>
                                    <p className='mt-2 text-xs text-slate-500'>{task.category || "uncategorized"} | {task.status || "pending"}</p>
                                    {task.deadline && (
                                        <div
                                            className={`mt-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium
                                             ${isOverdue(task.deadline) ? "bg-red-100 text-red-700" : "bg-purple-100 text-purple-700"}`}
                                        >
                                            <MdOutlineEvent size={14} />
                                            <span>{formatDeadline(task.deadline)}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <button
                                    type='button'
                                    aria-label='Delete Task'
                                    className='cursor-pointer hover:text-purple-800'
                                    onClick={() => window.confirm("Delete this task?") && onDeleteTask(task.id)}
                                >
                                    <AiOutlineDelete size={20}/>
                                </button>
                                <button
                                    type='button'
                                    aria-label='Edit Task'
                                    className='cursor-pointer hover:text-purple-800'
                                >
                                    <AiOutlineEdit size={20}/>
                                </button>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

export default TaskList;