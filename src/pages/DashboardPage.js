import React, { useState, useEffect } from 'react';
import { FaUserInjured, FaUserMd, FaCalendarCheck } from 'react-icons/fa';
import dashboardService from '../services/dashboardService';

// StatCard component remains the same
const StatCard = ({ icon, title, value, colorClass }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div className={`text-4xl p-4 rounded-full text-white ${colorClass}`}>
                {icon}
            </div>
            <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    );
};

const DashboardPage = () => {
    const [stats, setStats] = useState({
        totalPatients: 0,
        totalDoctors: 0,
        appointmentsToday: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dashboardService.getDashboardStats()
            .then(response => {
                setStats(response.data);
            })
            .catch(error => {
                console.error("Error fetching dashboard stats:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div className="p-8 text-center">Loading dashboard...</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard 
                    icon={<FaUserInjured />} 
                    title="Total Patients" 
                    value={stats.totalPatients} // Dynamic value
                    colorClass="bg-blue-500"
                />
                <StatCard 
                    icon={<FaUserMd />} 
                    title="Available Doctors" 
                    value={stats.totalDoctors} // Dynamic value
                    colorClass="bg-green-500"
                />
                <StatCard 
                    icon={<FaCalendarCheck />} 
                    title="Appointments Today" 
                    value={stats.appointmentsToday} // Dynamic value
                    colorClass="bg-purple-500"
                />
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">System Status</h2>
                <p>All systems are running normally. Welcome!</p>
            </div>
        </div>
    );
};

export default DashboardPage;