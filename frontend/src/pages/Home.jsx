import { useMemo, useState, useCallback } from "react";
import { useProfile } from "../profile/useProfile.js";
import { useTasks } from "../tasks/useTasks.js";
import PageLayout from "../components/PageLayout.jsx";
import Loader from '../components/Loader.jsx';
import TaskList from '../components/TaskList.jsx';
import CreateTaskModal from "../components/CreateTaskModal.jsx";
import { MdAddTask } from "react-icons/md";

function Home() {
    const { profile } = useProfile();
    const { tasks, loading, error, refetch, updateTask } = useTasks();
    const [showCreateTask, setShowCreateTask] = useState(false);

    // Normalize "today" to date-only so time does not affect comparisons.
    const today = useMemo(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }, []);

    // Safely parse a deadline-like value into a Date.
    const toDate = (value) => {
        if (!value) return null;
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? null : date;
    };

    // Calendar-day equality check (year/month/day only).
    const isSameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

    // Overdue means due date has passed end-of-day.
    const isOverdue = useCallback((value) => {
        const due = toDate(value);
        if (!due) return false;
        due.setHours(23, 59, 59, 999);
        return due < new Date();
    }, []);

    // Task is due on the same calendar day as "today".
    const isDueToday = useCallback((value) => {
        const due = toDate(value);
        if (!due) return false;
        return isSameDay(due, today);
    }, [today]);

    // Task is due between today and the next 7 days.
    const isDueThisWeek = useCallback((value) => {
        const due = toDate(value);
        if (!due) return false;

        const start = new Date(today);
        const end = new Date(today);
        end.setDate(end.getDate() + 7);

        due.setHours(0, 0, 0, 0);
        return due >= start && due <= end;
    }, [today]);

    // Sort by nearest deadline first; tasks without deadline go to the end.
    const sortedByDeadline = (list) =>
        [...list].sort((a, b) => {
            if (!a.deadline && !b.deadline) return 0;
            if (!a.deadline) return 1;
            if (!b.deadline) return -1;

            return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        });

    const pendingCount = useMemo(
        () => tasks.filter((task) => task.status === "pending").length,
        [tasks]
    );

    const inProgressCount = useMemo(
        () => tasks.filter((task) => task.status === "in_progress").length,
        [tasks]
    );

    // Count open tasks that are already overdue.
    const overdueCount = useMemo(
        () => tasks.filter((task) => task.status !== "completed" && isOverdue(task.deadline)).length,
        [tasks, isOverdue]
    );

    // Dashboard list: non-completed tasks that are overdue/due today/due this week.
    const attentionTasks = useMemo(() =>{
        const base = tasks.filter((task) => task.status !== "completed" && (isOverdue(task.deadline) || isDueToday(task.deadline) || isDueThisWeek(task.deadline)));
        return sortedByDeadline(base).slice(0, 8);
    }, [tasks, isOverdue, isDueToday, isDueThisWeek]);

    // Quick toggle used by the task list checkbox.
    const toggleTaskStatus = async (task) => {
        const nextStatus = task.status === "completed" ? "pending" : "completed";
        await updateTask(task.id, { status: nextStatus });
    };

    return (
        <>
            {loading && <Loader label='Loading dashboard...' />}

            <PageLayout>
                <div className="mx-auto md:max-w-6xl px-4 py-10">
                    <div className='flex flex-wrap items-center justify-between gap-3'>
                        <div>
                            <h1 className="text-4xl font-bold">{`Hey ${profile?.username || "there"}!`}</h1>
                            <p className="mt-4 text-slate-600">Here is your task snapshot for today</p>
                        </div>

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

                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-xl border border-white/60 bg-purple-50/85 p-4 shadow">
                            <p className="text-xs uppercase tracking-wide text-slate-500">Pending</p>
                            <p className="mt-1 text-3xl font-bold text-slate-900">{pendingCount}</p>
                        </div>

                        <div className="rounded-xl border border-white/60 bg-purple-50/85 p-4 shadow">
                            <p className="text-xs uppercase tracking-wide text-slate-500">In Progress</p>
                            <p className="mt-1 text-3xl font-bold text-slate-900">{inProgressCount}</p>
                        </div>

                        <div className="rounded-xl border border-white/60 bg-red-50/90 p-4 shadow">
                            <p className="text-xs uppercase tracking-wide text-red-500">Overdue</p>
                            <p className="mt-1 text-3xl font-bold text-red-700">{overdueCount}</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Needs Attention</h2>
                            <p className="text-sm text-slate-500">Due today, this week, or overdue</p>
                        </div>

                        {error && (
                            <p className="mt-4 text-red-600">
                                {error.message || "Failed to load dashboard tasks"}
                            </p>
                        )}

                        {!loading && !error && attentionTasks.length === 0 && (
                            <div className="rounded-xl border border-dashed border-slate-300 bg-purple-50/85 p-8 text-center">
                                <p className="font-medium text-slate-700">Nothing urgent right now</p>
                                <p className="mt-1 text-sm text-slate-500">
                                    You're clear for today. Add a task when you're ready.
                                </p>
                            </div>
                        )}

                        <TaskList tasks={attentionTasks} onToggleTaskStatus={toggleTaskStatus} />
                    </div>

                    {showCreateTask && <CreateTaskModal onClose={() => setShowCreateTask(false)} />}
                </div>
            </PageLayout>
        </>
    );
}

export default Home;
