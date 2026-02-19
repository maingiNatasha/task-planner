import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth.js";
import Loader from "../components/Loader.jsx";

function RequireAuth() {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loader label="Loading..." />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
}

export default RequireAuth