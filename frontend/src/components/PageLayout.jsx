import SimpleNav from "../components/SimpleNav.jsx";
import Footer from "../components/Footer.jsx";

function PageLayout({ children }) {
    return (
        <div className='min-h-screen flex flex-col bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200/80'>
            <SimpleNav />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default PageLayout