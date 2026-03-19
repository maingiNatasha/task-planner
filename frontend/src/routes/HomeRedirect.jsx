import { Navigate } from "react-router-dom";
import { useAuthState } from "../auth/useAuth.js";
import Loader from "../components/Loader.jsx";

function HomeRedirect() {
	const { loading, isAuthenticated } = useAuthState();

	if (loading) return <Loader label="Checking session..." />;

	return isAuthenticated ? (
		<Navigate to="/home" replace />
	) : (
		<Navigate to="/login" replace />
	);
}

export default HomeRedirect;