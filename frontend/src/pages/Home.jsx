import PageLayout from "../components/PageLayout.jsx";
import { useAuth } from "../auth/useAuth.js";

function Home() {
    const { user } = useAuth();
    const { email } = user;

    return (
        <PageLayout>
            <div className="mx-auto md:max-w-5xl px-4 py-16">
                <h1 className="text-7xl lg:text-8xl font-bold">Hey there!</h1>
                <p className="mt-20 text-3xl lg:text-4xl font-semibold">You are authenticated 🎉</p>
                <div className="mt-6 text-lg">
                    <span className="font-semibold">Current user:</span>
                    <span className="ml-2">{email}</span>
                </div>
            </div>
        </PageLayout>
    )
}

export default Home