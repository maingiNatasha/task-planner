import { useState } from "react";
import SimpleNav from "../components/SimpleNav.jsx";
import SideNav from "./SideNav.jsx";
import Footer from "../components/Footer.jsx";

function PageLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className='min-h-screen flex flex-col bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200/80'>
            <SideNav open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <SimpleNav onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

            <main className="flex-1">
                {children}
            </main>

            <Footer />
        </div>
    );
}

export default PageLayout;