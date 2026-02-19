import { useAuth } from "../auth/useAuth.js";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";
import { LiaUser } from "react-icons/lia";

function Options({ profile, user }) {
    const { logout } = useAuth();

    async function handleLogout() {
        try {
            await logout();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="bg-purple-100 p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-2 pb-4">
                <FaUserCircle size={40} />
                <div>
                    <h5 className="text-gray-600">{user?.email || "No email"}</h5>
                    <h5>{profile?.username || "No username yet"}</h5>
                </div>
            </div>
            <hr className="border-0 h-0.5 bg-gray-400" />
            <ul className="py-4 space-y-2">
                <li>
                    <Link to="/profile" className="flex items-center gap-2">
                        <LiaUser size={30} />
                        <span>Profile</span>
                    </Link>
                </li>
                <li>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 cursor-pointer"
                    >
                        <PiSignOut size={30} />
                        Sign out
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Options