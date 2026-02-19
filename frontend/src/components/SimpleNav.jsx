import { useAuth } from "../auth/useAuth.js";
import { FaSignOutAlt } from "react-icons/fa";

function SimpleNav() {
    const { logout } = useAuth();

    async function handleLogout() {
        try {
            await logout();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="sticky top-0 z-10 border-b border-white/10 bg-transparent backdrop-blur-md shadow-md">
            <div className="mx-auto flex items-center justify-between px-6 py-3">
                <h1 className="font-bold text-xl">Auth Starter</h1>
                <button
                    onClick={handleLogout}
                    className="flex items-center rounded-lg bg-purple-700 text-white px-4 py-2 font-semibold cursor-pointer hover:bg-purple-800"
                >
                    Logout
                    <FaSignOutAlt className="ml-2" size={20} />
                </button>
            </div>
        </div>
    )
}

export default SimpleNav