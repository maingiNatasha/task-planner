import PageLayout from '../components/PageLayout.jsx';
import Loader from '../components/Loader.jsx';
import { useTask } from "../task/useTask.js";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

function Tasks() {
    const { tasks, loading, error, refetch, deleteTask } = useTask();

    return (
        <>
            {loading && <Loader label='Loading tasks...' />}

            <PageLayout>
                <div className='mx-auto max-w-5xl px-4 py-10'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-3xl font-bold'>My Tasks</h1>
                        <button type='button' onClick={refetch} className='rounded-lg bg-purple-700 text-white px-3 py-2 text-sm font-bold cursor-pointer hover:bg-purple-800'>Refresh</button>
                    </div>

                    {error && <p className='text-red-600 mt-4'>{error.message || "Failed to load tasks"}</p>}
                    {!loading && !error && tasks.length === 0 && <p className='mt-6'>No tasks yet.</p>}

                    <ul className='mt-6 space-y-4'>
                        {tasks.map((task) => (
                            <li key={task.id} className='rounded-xl border border-white/60 bg-purple-50/85 p-4 shadow-lg hover:bg-white hover:shadow-xl'>
                                <div className='flex items-start justify-between gap-4'>
                                    <div>
                                        <h2 className='font-semibold'>{task.title || "(Untitled task)"}</h2>
                                        <p className='text-sm text-slate-600'>{task.description || "No description"}</p>
                                        <p className='mt-2 text-xs text-slate-500'>{task.category || "uncategorized"} | {task.status || "pending"}</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <button type='button' aria-label='Delete Task' className='cursor-pointer' onClick={() => window.confirm("Delete this task?") && deleteTask(task.id)}><AiOutlineDelete size={20}/></button>
                                        <button type='button' aria-label='Edit Task' className='cursor-pointer'><AiOutlineEdit size={20}/></button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </PageLayout>
        </>
    );
}

export default Tasks;