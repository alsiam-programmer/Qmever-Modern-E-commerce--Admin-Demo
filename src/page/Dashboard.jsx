import React from 'react'

const Dashboard = () => {
    return (
        <section className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                    <p className="text-sm text-gray-500">Total Earnings</p>
                    <p className="text-2xl font-bold text-green-600">৳12,500</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-800">150</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                    <p className="text-sm text-gray-500">Products</p>
                    <p className="text-2xl font-bold text-purple-600">45</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                    <p className="text-sm text-gray-500">Customers</p>
                    <p className="text-2xl font-bold text-blue-600">200</p>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white p-6 rounded-xl shadow mb-8">
                <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2">Order ID</th>
                            <th className="py-2">Customer</th>
                            <th className="py-2">Status</th>
                            <th className="py-2">Total</th>
                            <th className="py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-gray-100">
                            <td className="py-2">#12345</td>
                            <td className="py-2">John Doe</td>
                            <td className="py-2 text-green-600 font-semibold">Delivered</td>
                            <td className="py-2">৳2,500</td>
                            <td className="py-2 text-blue-600 cursor-pointer">View</td>
                        </tr>
                        {/* Add more rows dynamically */}
                    </tbody>
                </table>
            </div>

            {/* Charts or Widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-xl font-semibold mb-4">Sales Over Time</h3>
                    {/* Chart component goes here */}
                </div>
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-xl font-semibold mb-4">Top Selling Products</h3>
                    {/* Chart component goes here */}
                </div>
            </div>
        </section>
    )
}

export default Dashboard