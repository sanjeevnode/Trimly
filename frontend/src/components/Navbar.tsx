

export default function Navbar() {
    return (
        <nav className="">
            <div className="flex items-center justify-between p-4">
                <div className="text-lg font-bold">Trimly</div>
                <div className="space-x-4">
                    <a href="/" className="hover:underline">Home</a>
                    <a href="/dashboard" className="hover:underline">Dashboard</a>
                    <a href="/profile" className="hover:underline">Profile</a>
                    <a href="/contact" className="hover:underline">Contact</a>
                    <a href="/auth" className="hover:underline">Login</a>
                </div>
            </div>
        </nav>
    )
}
