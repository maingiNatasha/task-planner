import PageLayout from "../components/PageLayout.jsx";

function Home() {
    return (
        <PageLayout>
            <div className="mx-auto md:max-w-5xl px-4 py-16">
                <h1 className="text-6xl lg:text-7xl font-bold">Hey there!</h1>
            </div>
        </PageLayout>
    );
}

export default Home;
