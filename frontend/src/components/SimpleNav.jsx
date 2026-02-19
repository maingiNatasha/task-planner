import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth.js";
import { useProfile } from "../hooks/useProfile.js";
import Options from "./Options";
import { FaUserCircle } from "react-icons/fa";

function SimpleNav() {
    const [showOptions, setShowOptions] = useState(false);
    const menuWrapperRef = useRef(null);
    const { isAuthenticated, loading, user } = useAuth();
    const { profile } = useProfile(user?.id);

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

    const avatarLetter = profile?.username?.[0]?.toUpperCase() || profile?.firstname?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "";

    const handleToggleOptions = () => {
        if (!isAuthenticated || loading) return;
        setShowOptions((prev) => !prev);
    };

    return (
        <div className="sticky top-0 z-10 border-b border-white/10 bg-transparent backdrop-blur-md shadow-md">
            <div className="mx-auto flex items-center justify-between px-6 py-3 relative">
                <h1 className="font-bold text-xl cursor-pointer">
                    <Link to="/home">Task Planner</Link>
                </h1>

                <div ref={menuWrapperRef} className="relative">
                    <button
                        type="button"
                        onClick={handleToggleOptions}
                        aria-label="Open account menu"
                        aria-expanded={showOptions}
                        className={`h-10 w-10 rounded-full grid place-items-center transition
                        ${!isAuthenticated || loading ? "opacity-50 cursor-not-allowed" : "hover:bg-black/10"}
                        ${showOptions ? "ring-2 ring-black/20" : ""}`}
                        disabled={!isAuthenticated || loading}
                    >
                        {avatarLetter ? (
                            <span className="h-8 w-8 rounded-full bg-slate-800 text-white grid place-items-center font-semibold">
                                {avatarLetter}
                            </span>
                        ) : (
                            <FaUserCircle size={30} />
                        )}
                    </button>

                    {isAuthenticated && showOptions && (
                        <div className="absolute right-0 top-[72px]">
                            <Options profile={profile} user={user} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SimpleNav;
