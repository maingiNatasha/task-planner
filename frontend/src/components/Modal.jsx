import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

function Modal({ title, onClose, children }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const onEsc = (event) => {
            if (event.key === "Escape") onClose();
        };

        const rafId = requestAnimationFrame(() => setMounted(true));

        document.addEventListener("keydown", onEsc);
        document.body.style.overflow = "hidden";

        return () => {
            cancelAnimationFrame(rafId);
            document.removeEventListener("keydown", onEsc);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50">
            <button
                type="button"
                aria-label="Close modal overlay"
                className={`absolute inset-0 bg-black/70 backdrop-blur-[1px] transition-opacity duration-200
                 ${mounted ? "opacity-100" : "opacity-0"}`}
                onClick={onClose}
            />

            <div className="relative z-10 flex min-h-full items-center justify-center p-4">
                <div
                    className={`w-full max-w-lg rounded-2xl border border-white/20 bg-white shadow-2xl transition-all duration-200 ease-out
                     ${mounted ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-95 opacity-0"}`}
                >
                    <div className="flex items-center justify-between px-5 py-4">
                        <h2 className="text-lg font-bold">{title}</h2>
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close modal"
                            className="grid h-9 w-9 place-items-center rounded-md hover:bg-purple-100"
                        >
                            <FiX size={20} />
                        </button>
                    </div>

                    <div className="px-5 pb-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;