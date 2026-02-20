import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { LiaUser } from "react-icons/lia";
import { HiOutlineHome } from "react-icons/hi2";
import { FiX } from "react-icons/fi";

function SideNav({ open, onClose }) {
    const location = useLocation();

    const navItems = [
        { icon: HiOutlineHome, to: "/home", label: "Home"},
        { icon: LiaUser, to: "/profile", label: "Profile"},
    ];

    return (
        <>
            {open && (
                <button
                    type="button"
                    aria-label="Close sidebar overlay"
                    onClick={onClose}
                    className="fixed inset-0 z-30 bg-black/40"
                />
            )}
            <aside
                className={classNames(
                    "fixed left-0 top-0 z-40 h-screen w-72 bg-purple-50 shadow-xl transition-transform duration-200",
                    open ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="p-6 flex items-center justify-between">
                    <span className="font-bold text-xl">Task Planner</span>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close sidebar"
                        className="grid h-9 w-9 place-items-center rounded-md hover:bg-purple-200/85"
                    >
                        <FiX size={20} />
                    </button>
                </div>
                <nav className="p-3 space-y-1">
                    {navItems.map((item) => {
                        const active = location.pathname === item.to;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                onClick={onClose}
                                className={classNames(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                                    active ? "bg-purple-100 text-purple-900" : "text-slate-700 hover:bg-slate-50"
                                )}
                            >
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}

export default SideNav;
