import { useEffect, useRef, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useAuth } from "../auth/useAuth.js";
import { useProfile } from "../profile/useProfile.js";
import Options from "./Options";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";

function SimpleNav({ onToggleSidebar }) {
    const [showOptions, setShowOptions] = useState(false);
    const menuWrapperRef = useRef(null);
    const { isAuthenticated, loading, user } = useAuth();
    const { profile } = useProfile();

    useEffect(() => {
        if (!isAuthenticated) {
            setShowOptions(false);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (!showOptions) return;

        const handleClickOutside = (event) => {
            if (!menuWrapperRef.current?.contains(event.target)) {
                setShowOptions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showOptions]);

    const avatarLetter = useMemo(() => {
        return (
            profile?.username?.[0]?.toUpperCase() ||
            profile?.firstname?.[0]?.toUpperCase() ||
            user?.email?.[0]?.toUpperCase()||
            ""
        );
    }, [profile?.username, profile?.firstname, user?.email]);

    const handleToggleOptions = () => {
        if (!isAuthenticated || loading) return;
        setShowOptions((prev) => !prev);
    };

    return (
        <div className="sticky top-0 z-20 border-b border-white/10 bg-transparent backdrop-blur-md shadow-md">
            <div className="mx-auto flex items-center justify-between px-6 py-3 relative">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onToggleSidebar}
                        className="grid h-9 w-9 place-items-center rounded-md hover:bg-purple-200/85"
                        aria-label="Open navigation menu"
                    >
                        <HiOutlineMenu size={22} />
                    </button>

                    <h1 className="font-bold text-xl cursor-pointer">
                        <Link to="/home">Task Planner</Link>
                    </h1>
                </div>

                <div ref={menuWrapperRef} className="relative">
                    <button
                        type="button"
                        onClick={handleToggleOptions}
                        aria-label="Open account menu"
                        aria-expanded={showOptions}
                        className={classNames(
                            "h-10 w-10 rounded-full grid place-items-center transition",
                            !isAuthenticated || loading ? "opacity-50 cursor-not-allowed" : "hover:bg-black/10",
                            showOptions && "ring-2 ring-black/20"
                        )}
                        disabled={!isAuthenticated || loading}
                    >
                        {avatarLetter ? (
                            <span className="h-8 w-8 rounded-full bg-purple-800 text-white grid place-items-center font-semibold">
                                {avatarLetter}
                            </span>
                        ) : (
                            <FaUserCircle size={30} />
                        )}
                    </button>

                    {isAuthenticated && showOptions && (
                        <div className="absolute right-0 top-[72px] z-50">
                            <Options />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SimpleNav;
