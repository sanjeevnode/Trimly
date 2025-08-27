export default function Loading() {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-white">
            <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                <p className="text-sm text-gray-600">Redirecting...</p>
            </div>
        </div>
    );
}
