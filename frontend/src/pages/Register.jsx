import { useState } from 'react';
import { useNavigate, Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormLayout from '../components/FormLayout.jsx';
import { useAuth } from "../auth/useAuth.js";
import { MdPersonAddAlt1, MdError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

// Helper function to evaluate password
function getPasswordChecks(password) {
    return {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
}

function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const { register, isAuthenticated, loading } = useAuth();

    // Password checks
    const checks = getPasswordChecks(form.password);
    const passwordsMatch = form.password === confirmPassword;

    // If user is already logged in, don't show registration form
    if (!loading && isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    // Set form values on change
    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    // Handle form submit
    async function handleSubmit(e) {
        e.preventDefault();
        if (submitting) return;

        if (!passwordsMatch) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setSubmitting(true);
            await register(form);
            toast.success("Registration successful.");
            navigate("/login", { replace: true });
        } catch (err) {
            const message = err?.message || "Registration failed. Try again.";
            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <FormLayout>
            <div>
                <div className='text-center text-gray-950'>
                    <h1 className='text-2xl font-bold'>Create an account</h1>
                    <p className='font-semibold mt-3'>Sign up to continue</p>
                </div>
                <div className='flex justify-center mb-6'>
                    <MdPersonAddAlt1 size={50} />
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

                        {/* Password Hints */}
                        <ul className="mt-2 space-y-1 text-xs">
                            <li className={`flex items-center ${checks.length ? "text-green-700" : "text-gray-600"}`}>
                                {checks.length ? <FaCheckCircle size={15} className='mr-1' /> : "•"} At least 8 characters
                            </li>
                            <li className={`flex items-center ${checks.uppercase ? "text-green-700" : "text-gray-600"}`}>
                                {checks.uppercase ? <FaCheckCircle size={15} className='mr-1' /> : "•"} At least one uppercase letter
                            </li>
                            <li className={`flex items-center ${checks.number ? "text-green-700" : "text-gray-600"}`}>
                                {checks.number ? <FaCheckCircle size={15} className='mr-1' /> : "•"} At least one number
                            </li>
                            <li className={`flex items-center ${checks.special ? "text-green-700" : "text-gray-600"}`}>
                                {checks.special ? <FaCheckCircle size={15} className='mr-1' /> : "•"} At least one special character
                            </li>
                        </ul>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className='block text-sm font-medium text-gray-800'>
                            Confirm password
                        </label>
                        <input
                            name="confirm-password"
                            type="password"
                            className='mt-1 w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
                            placeholder='********'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        {confirmPassword.length > 0 && !passwordsMatch && (
                            <div className="flex items-center mt-2 text-xs text-red-600">
                                <span><MdError size={15} className='mr-1' /></span>
                                <span>Passwords do not match.</span>
                            </div>
                        )}
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className='mt-4 w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition'
                        disabled={submitting}
                    >
                        {submitting ? "Signing up..." : "Sign Up"}
                    </button>
                </form>

                <p className='mt-6 text-center text-sm text-gray-700'>
                    Already have an account?
                    <Link to="/login" className='ml-1 text-purple-600 hover:underline'>Sign In</Link>
                </p>
            </div>
        </FormLayout>
    );
}

export default Register