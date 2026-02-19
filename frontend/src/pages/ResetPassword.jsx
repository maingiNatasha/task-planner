import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../auth/useAuth.js";
import FormLayout from '../components/FormLayout.jsx';
import { MdError } from "react-icons/md";
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

function ResetPassword() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const { resetPassword } = useAuth();
    const [params] = useSearchParams();
    const token = params.get("token");

    // Password checks
    const checks = getPasswordChecks(password);
    const passwordsMatch = password === confirmPassword;

    async function handleSubmit(e) {
        e.preventDefault();
        if (submitting) return;

        // Check token
        if (!token) {
            toast.error("Reset link is missing or invalid.");
            return;
        }

        // Check if passwords match
        if (!passwordsMatch) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            setSubmitting(true);
            await resetPassword(token, password);
            toast.success("Password reset successful. Please log in.");
            navigate("/login", { replace: true });
        } catch (err) {
            console.error(err);
            toast.error(err?.message || "Reset link is invalid or expired.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <FormLayout>
            <h1 className="text-2xl font-bold text-center">Reset Password</h1>

            <form className="mt-6" onSubmit={handleSubmit}>
                {/* Password */}
                <div>
                    <label className='block text-sm font-medium text-gray-800'>
                        New password
                    </label>
                    <input
                        name="password"
                        type="password"
                        className='mt-1 w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
                        placeholder='********'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {/* Password Hints */}
                    <ul className="my-2 space-y-1 text-xs">
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
                <div className="mt-4">
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
                    className='mt-8 w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition'
                    disabled={submitting}
                >
                    {submitting ? "Submitting..." : "Submit"}
                </button>
            </form>

            <p className='mt-6 text-center text-sm text-gray-700'>
                Go back to
                <Link to="/login" className='ml-1 text-purple-600 hover:underline'>Sign In</Link>
            </p>
        </FormLayout>
    )
}

export default ResetPassword