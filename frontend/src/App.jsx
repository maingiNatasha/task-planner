import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RequireAuth from "./auth/RequireAuth.jsx";
import HomeRedirect from "./routes/HomeRedirect.jsx";

import Login from './pages/Login.jsx';
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
	return (
		<>
			<Routes>
				{/* Root redirect */}
				<Route path="/" element={<HomeRedirect />} />

				{/* Public routes */}
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/reset-password" element={<ResetPassword />} />

				{/* Protected routes */}
				<Route element={<RequireAuth />}>
					<Route path="/home" element={<Home />} />
				</Route>

				{/* Catch-all */}
				<Route path="*" element={<NotFound />} />
			</Routes>
			<ToastContainer />
		</>
	);
}

export default App;
