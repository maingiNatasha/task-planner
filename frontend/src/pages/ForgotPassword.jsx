import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../auth/useAuth.js";
import FormLayout from '../components/FormLayout.jsx';

function ForgotPassword() {
    const [submitting, setSubmitting] = useState(false);
    const [email, setEmail] = useState("");
    const { forgotPassword } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        if (submitting) return;

        try {
            setSubmitting(true);
            await forgotPassword(email);
            toast.success("If that email exists, we sent a reset link.");
        } catch (err) {
            // Still keep it vague to avoid user enumeration
            toast.success("If that email exists, we sent a reset link.");
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <FormLayout>
            <h1 className="text-2xl font-bold text-center">Forgot Password</h1>
            <p className="my-4 text-md">Please enter the email address linked to your account</p>

            <form onSubmit={handleSubmit}>
                {/* Email */}
                <input
                    name="email"
                    type='email'
                    className='mt-1 w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
                    placeholder='email@test.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

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

export default ForgotPassword