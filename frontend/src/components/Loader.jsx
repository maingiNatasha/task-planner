import { ClipLoader } from "react-spinners";

function Loader({ label = "Loading..." }) {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200/80">
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/15 bg-white/15 backdrop-blur-md px-10 py-8 shadow-xl">
                <ClipLoader
                    size={70}
                    color="purple"
                    speedMultiplier={0.9}
                />
                <span className="text-md">{label}</span>
            </div>
        </div>
    )
}

export default Loader