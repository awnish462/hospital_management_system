// import React, { useState, useEffect } from 'react';
// import { FaUserInjured, FaUserMd, FaCalendarCheck } from 'react-icons/fa';
// import dashboardService from '../services/dashboardService';

// // StatCard component remains the same
// const StatCard = ({ icon, title, value, colorClass }) => {
//     return (
//         <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
//             <div className={`text-4xl p-4 rounded-full text-white ${colorClass}`}>
//                 {icon}
//             </div>
//             <div className="ml-4">
//                 <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
//                 <p className="text-2xl font-bold text-gray-800">{value}</p>
//             </div>
//         </div>
//     );
// };

// const DashboardPage = () => {
//     const [stats, setStats] = useState({
//         totalPatients: 0,
//         totalDoctors: 0,
//         appointmentsToday: 0,
//     });
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         dashboardService.getDashboardStats()
//             .then(response => {
//                 setStats(response.data);
//             })
//             .catch(error => {
//                 console.error("Error fetching dashboard stats:", error);
//             })
//             .finally(() => {
//                 setIsLoading(false);
//             });
//     }, []);

//     if (isLoading) {
//         return <div className="p-8 text-center">Loading dashboard...</div>;
//     }

//     return (
//         <div className="p-8">
//             <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <StatCard 
//                     icon={<FaUserInjured />} 
//                     title="Total Patients" 
//                     value={stats.totalPatients} // Dynamic value
//                     colorClass="bg-blue-500"
//                 />
//                 <StatCard 
//                     icon={<FaUserMd />} 
//                     title="Available Doctors" 
//                     value={stats.totalDoctors} // Dynamic value
//                     colorClass="bg-green-500"
//                 />
//                 <StatCard 
//                     icon={<FaCalendarCheck />} 
//                     title="Appointments Today" 
//                     value={stats.appointmentsToday} // Dynamic value
//                     colorClass="bg-purple-500"
//                 />
//             </div>

//             <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-2xl font-semibold mb-4">System Status</h2>
//                 <p>All systems are running normally. Welcome!</p>
//             </div>
//         </div>
//     );
// };

// export default DashboardPage;

import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaCalendarCheck, FaDollarSign } from 'react-icons/fa';

// Import the service and all our new components
import dashboardService from '../services/dashboardService';
import StatCard from '../components/StatCard';
import AppointmentsTable from '../components/AppointmentsTable';
import StatusDonutChart from '../components/StatusDonutChart';

// We'll also need the chart.js components for the line and bar charts
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register all the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);


const DashboardPage = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dashboardService.getEnhancedDashboardData()
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("Error fetching dashboard data:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    // Display a loading message while data is being fetched
    if (isLoading || !data) {
        return <div className="p-8 text-center text-lg">Loading Dashboard, please wait...</div>;
    }
    
    // --- Prepare Data for Charts ---
    const appointmentsLineData = {
        labels: Object.keys(data.appointmentsYearByYear),
        datasets: [{ 
            label: 'Appointments', 
            data: Object.values(data.appointmentsYearByYear), 
            borderColor: '#ec4899', // theme-pink
            backgroundColor: 'rgba(236, 72, 153, 0.1)',
            fill: true,
            tension: 0.4 
        }],
    };

    const patientsBarData = {
        labels: Object.keys(data.patientsYearByYear),
        datasets: [{ 
            label: 'New Patients', 
            data: Object.values(data.patientsYearByYear), 
            backgroundColor: '#f97316' // theme-orange
        }],
    };

    const chartOptions = {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
    };
    // --- End Chart Data Preparation ---

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans">
            {/* Row 1: Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <StatCard icon={<FaUserPlus/>} title="Patients" value={data.totalPatients} change={20} isPositive={true} color="text-theme-pink border-theme-pink"/>
                <StatCard icon={<FaCalendarCheck/>} title="Appointments" value={data.totalAppointments} change={15} isPositive={false} color="text-green-500 border-green-500"/>
                <StatCard icon={<FaDollarSign/>} title="Total Revenue" value={`$${data.totalRevenue.toLocaleString()}`} change={10} isPositive={true} color="text-theme-orange border-theme-orange"/>
            </div>

            {/* Row 2: Historical Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-gray-700">Appointments Year by Year</h3>
                    <Line data={appointmentsLineData} options={chartOptions} />
                </div>
                 <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-gray-700">Patients Year by Year</h3>
                    <Bar data={patientsBarData} options={chartOptions} />
                </div>
            </div>

            {/* Row 3: Appointments Table and Status Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* The main table will take up 2/3 of the space on large screens */}
                <div className="lg:col-span-2">
                     <AppointmentsTable appointments={data.recentAppointments} />
                </div>
                
                {/* The donut chart will take up 1/3 of the space */}
                <div className="lg:col-span-1">
                    <StatusDonutChart statusData={data.appointmentStatusCounts} />
                </div>
            </div>
             
             {/* We can add the Doctors Availability table here later if needed */}
        </div>
    );
};

export default DashboardPage;