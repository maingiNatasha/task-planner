import { useAuth } from "../auth/useAuth.js";
import { useProfile } from "../profile/useProfile.js";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";
import { LiaUser } from "react-icons/lia";

function Options() {
    const { logout, user } = useAuth();
    const { profile } = useProfile();

    async function handleLogout() {
        try {
            await logout();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="rounded-2xl border border-white/60 bg-purple-50 p-4 shadow-lg text-sm">
            <div className="flex items-center gap-2 pb-4">
                <FaUserCircle size={30} />
                <div>
                    <h5 className="text-gray-600">{user?.email || "No email"}</h5>
                    <h5>{profile?.username || "No username yet"}</h5>
                </div>
            </div>
            <hr className="border-0 h-0.5 bg-gray-400" />
            <ul className="py-2">
                <li className="rounded-lg px-3 py-2 transition hover:bg-purple-100 hover:text-purple-900">
                    <Link to="/profile" className="flex items-center gap-2">
                        <LiaUser size={25} />
                        <span>Profile</span>
                    </Link>
                </li>
                <li className="rounded-lg px-3 py-2 transition hover:bg-purple-100 hover:text-purple-900">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 cursor-pointer"
                    >
                        <PiSignOut size={25} />
                        Sign out
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Options