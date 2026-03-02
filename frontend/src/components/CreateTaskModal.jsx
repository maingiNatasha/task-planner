import { useEffect } from "react";
import { FiX } from "react-icons/fi";

function CreateTaskModal({ onClose }) {
    useEffect(() => {
        const onEsc = (event) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", onEsc);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onEsc);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50">
            <button
                type="button"
                aria-label="Close create task modal overlay"
                className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"
                onClick={onClose}
            />

            <div className="relative z-10 flex min-h-full items-center justify-center p-4">
                <div className="w-full max-w-lg rounded-2xl border border-white/20 bg-white shadow-2xl">
                    <div className="flex items-center justify-between px-5 py-4">
                        <h2 className="text-lg font-bold">Create Task</h2>
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close create task modal"
                            className="grid h-9 w-9 place-items-center rounded-md hover:bg-purple-100"
                        >
                            <FiX size={20} />
                        </button>
                    </div>

                    <div className="px-5 pb-4">
                        <form>
                            Form
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateTaskModal;