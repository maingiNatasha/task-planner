function FormLayout({ children }) {
    return (
        <div className='min-h-screen flex items-center justify-center mx-auto px-4 md:px-0 bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200/80'>
            <div className='w-full md:max-w-sm bg-white/15 backdrop-blur-lg border border-white/15 rounded-2xl shadow-xl p-6'>
                { children }
            </div>
        </div>
    )
}

export default FormLayout