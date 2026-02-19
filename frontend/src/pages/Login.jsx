import { useState } from 'react';
import { useLocation, useNavigate, Navigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../auth/useAuth.js";
import FormLayout from '../components/FormLayout.jsx';
import { FaSignInAlt } from "react-icons/fa";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({ email: "", password: "", remember: false });
    const { isAuthenticated, loading, login } = useAuth();
    const [submitting, setSubmitting] = useState(false);

    // If user is already logged in, don't show login form
    if (!loading && isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    const from = location.state?.from?.pathname || "/home";

    // Set form values on change
    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev, [name]: type === "checkbox" ? checked : value
        }));
    }

	async function handleSubmit(e) {
		e.preventDefault();
        if (submitting) return;

        try {
            setSubmitting(true);
            await login(form);
            toast.success("Login successful");
            navigate(from, { replace: true });
        } catch (err) {
            // From axios interceptor: { status, message, data }
            const message = err?.message || "Login failed. Please try again.";
            toast.error(message);
        } finally {
            setSubmitting(false);
        }
	}

    return (
        <FormLayout>
            <div>
                <div className='text-center text-gray-950'>
                    <h1 className='text-2xl font-bold'>Welcome back</h1>
                    <p className='font-semibold mt-3'>Sign in to continue</p>
                </div>
                <div className='flex justify-center mb-6'>
                    <FaSignInAlt size={50} />
                </div>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    {/* Email */}
                    <div>
                        <label className='block text-sm font-medium text-gray-800'>
                            Email
                        </label>
                        <input
                            name="email"
                            type='email'
                            className='mt-1 w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
                            placeholder='email@test.com'
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className='block text-sm font-medium text-gray-800'>
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            className='mt-1 w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
                            placeholder='********'
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Remember me & Forgot password */}
                    <div className='flex items-center justify-between'>
                        <label className='flex items-center gap-2 text-sm text-gray-700'>
                            Remember me
                            <input
                                type='checkbox'
                                name='remember'
                                checked={form.remember}
                                onChange={handleChange}
                                className='h-4 w-4 rounded border-gray-400 accent-purple-600'
                            />
                        </label>
                        <Link to="/forgot-password" className='text-sm text-purple-600 hover:underline'>Forgot Password?</Link>
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className='mt-4 w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition'
                        disabled={submitting}
                    >
                        {submitting ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <p className='mt-6 text-center text-sm text-gray-700'>
                    Don't have an account?
                    <Link to="/register" className='ml-1 text-purple-600 hover:underline'>Sign Up</Link>
                </p>
            </div>
        </FormLayout>
    );
}

export default Login;