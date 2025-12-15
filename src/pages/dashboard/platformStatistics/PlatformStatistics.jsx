import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PlatformStatistics = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState(null);

    useEffect(() => {
        axiosSecure.get('/admin/platform-stats')
            .then(res => setStats(res.data))
            .catch(err => console.log(err));
    }, [axiosSecure]);

    if (!stats) {
        return <div className="text-center py-10">Loading statistics...</div>;
    }

    const orderData = [
        { name: 'Delivered', value: stats.deliveredOrders },
        { name: 'Pending', value: stats.pendingOrders }
    ];

    const barData = [
        { name: 'Users', value: stats.totalUsers },
        { name: 'Delivered Orders', value: stats.deliveredOrders },
        { name: 'Pending Orders', value: stats.pendingOrders }
    ];

    return (
        <div className="p-4 md:p-8 space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold">
                📊 Platform Statistics
            </h2>

            {/* 🔢 Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white shadow rounded p-5">
                    <p className="text-gray-500">Total Payment</p>
                    <h3 className="text-2xl font-bold text-green-600">
                        ${stats.totalPaymentAmount.toFixed(2)}
                    </h3>
                </div>

                <div className="bg-white shadow rounded p-5">
                    <p className="text-gray-500">Total Users</p>
                    <h3 className="text-2xl font-bold">
                        {stats.totalUsers}
                    </h3>
                </div>

                <div className="bg-white shadow rounded p-5">
                    <p className="text-gray-500">Orders Delivered</p>
                    <h3 className="text-2xl font-bold text-blue-600">
                        {stats.deliveredOrders}
                    </h3>
                </div>

                <div className="bg-white shadow rounded p-5">
                    <p className="text-gray-500">Orders Pending</p>
                    <h3 className="text-2xl font-bold text-orange-500">
                        {stats.pendingOrders}
                    </h3>
                </div>
            </div>

            {/* 📈 Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pie Chart */}
                <div className="bg-white shadow rounded p-3 h-[350px]">
                    <h3 className="font-semibold mb-4">Orders Overview</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={orderData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {orderData.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div className="bg-white shadow rounded p-3 h-[350px]">
                    <h3 className="font-semibold mb-4">Platform Activity</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default PlatformStatistics;
