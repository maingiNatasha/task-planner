import { useMemo, useState } from "react";
import { useTask } from "../task/useTask.js";
import PageLayout from '../components/PageLayout.jsx';
import Loader from '../components/Loader.jsx';
import TaskList from '../components/TaskList.jsx';
import CreateTaskModal from "../components/CreateTaskModal.jsx";
import { TbListSearch } from "react-icons/tb";
import { MdAddTask } from "react-icons/md";

const FILTERS = [
    { key: "all", label: "All Tasks" },
    { key: "pending", label: "Pending" },
    { key: "completed", label: "Completed" },
    { key: "in_progress", label: "In Progress" }
];

function MyTasks() {
    const { tasks, loading, error, refetch, updateTask } = useTask();
    const [statusFilter, setStatusFilter] = useState("all");
    const [showCreateTask, setShowCreateTask] = useState(false);

    const toggleTaskStatus = async(task) => {
        const nextStatus = task.status === "completed" ? "pending" : "completed";
        await updateTask(task.id, { status: nextStatus });
    };

    const filteredTasks = useMemo(() => {
        const base = statusFilter === "all" ? tasks : tasks.filter((task) => task.status === statusFilter);

        return [...base].sort((a, b) => {
            // Put tasks without deadline at the end
            if (!a.deadline && !b.deadline) return 0;
            if (!a.deadline) return 1;
            if (!b.deadline) return -1;

            // Earlier deadline first
            return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        });
    }, [tasks, statusFilter]);

    return (
        <>
            {loading && <Loader label='Loading tasks...' />}

            <PageLayout>
                <div className='mx-auto max-w-5xl px-4 py-10'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-3xl font-bold'>My Tasks</h1>
                        <div className="flex items-center gap-3">
                            {tasks.length > 0 &&
                                <button
                                    type="button"
                                    onClick={() => setShowCreateTask(true)}
                                    className="flex items-center gap-1 rounded-lg bg-purple-700 text-white px-3 py-2 text-sm font-bold cursor-pointer hover:bg-purple-800"
                                >
                                    <span>Add a Task</span>
                                    <MdAddTask size={20}/>
                                </button>
                            }
                            <button
                                type='button'
                                onClick={refetch}
                                className='rounded-lg bg-purple-700 text-white px-3 py-2 text-sm font-bold cursor-pointer hover:bg-purple-800'
                            >
                                Refresh
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                        {FILTERS.map((filter) => (
                            <button
                                key={filter.key}
                                type="button"
                                onClick={() => setStatusFilter(filter.key)}
                                className={`rounded-full px-3 py-1 text-sm border cursor-pointer
                                 ${statusFilter === filter.key ? "bg-purple-700 text-white border-purple-700" : "bg-purple-50 text-slate-700 border-slate-300"}`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    {error && <p className='text-red-600 mt-4'>{error.message || "Failed to load tasks"}</p>}
                    {!loading && !error && filteredTasks.length === 0 && (
                        <div className="mt-10 rounded-xl border border-dashed border-slate-300 bg-purple-50/85 p-10 text-center">
                            <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-full bg-purple-100 text-purple-700">
                                <TbListSearch size={35}/>
                            </div>
                            <p className="font-medium text-slate-700">No tasks yet</p>
                            <p className="mt-1 text-sm text-slate-500">{statusFilter === "all" ? "Create your first task to get started." : "There are no tasks available with the selected status."}</p>

                            {statusFilter === "all" && (
                                <div className="mt-6 flex justify-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateTask(true)}
                                        className="flex items-center gap-1 rounded-lg bg-purple-700 text-white px-3 py-2 text-sm font-bold cursor-pointer hover:bg-purple-800"
                                    >
                                        <span>Create a task</span>
                                        <MdAddTask size={20}/>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    <TaskList tasks={filteredTasks} onToggleTaskStatus={toggleTaskStatus} />

                    {showCreateTask && <CreateTaskModal onClose={() => setShowCreateTask(false)} />}
                </div>
            </PageLayout>
        </>
    );
}

export default MyTasks;