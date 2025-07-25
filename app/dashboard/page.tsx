import React from 'react'

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
                    <p className="text-gray-600 mt-2">Welcome to your Trimly dashboard</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-xl font-semibold mb-2">Total Links</h3>
                        <p className="text-3xl font-bold text-blue-600">0</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-xl font-semibold mb-2">Total Clicks</h3>
                        <p className="text-3xl font-bold text-purple-600">0</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-xl font-semibold mb-2">Active Links</h3>
                        <p className="text-3xl font-bold text-green-600">0</p>
                    </div>
                </div>

                <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
                    <p className="text-gray-500">No recent activity to display.</p>
                </div>
            </div>
        </div>
    )
}
