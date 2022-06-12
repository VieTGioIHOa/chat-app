
export default function Loading() {

    return (
        <div className="flex items-center justify-center h-screen w-screen">
            <button type="button" className="bg-indigo-500 text-white" disabled>
                <svg className="animate-spin h-5 w-5 mr-3 text-white " viewBox="0 0 24 24">
                </svg>
                Processing...
            </button>
        </div>
    )
}