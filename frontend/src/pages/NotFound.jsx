import { Link } from "react-router-dom";
import image from "../assets/images/404-error.png";

function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200/80">
            <div className="w-full max-w-md text-center rounded-2xl border border-white/15 bg-white/15 backdrop-blur-md p-8 shadow-xl">
                <div className="flex justify-center mb-4">
                    <img src={image} alt="404-error" width={120} />
                </div>

                <h1 className="text-4xl font-bold">404</h1>
                <p className="mt-2 text-lg font-semibold">Page not found</p>

                <p className="mt-4 text-sm">Sorry, the page you're looking for doesn't exist or may have been moved.</p>

                <div className="mt-6 flex justify-center gap-3 text-white">
                    <Link to="/" className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold hover:bg-purple-700 transition">
                        Go back to home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound