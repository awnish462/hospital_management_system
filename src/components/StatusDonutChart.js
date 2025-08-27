import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatusDonutChart = ({ statusData }) => {
    const labels = Object.keys(statusData);
    const dataValues = Object.values(statusData);

    const data = {
        labels: labels,
        datasets: [{
            data: dataValues,
            backgroundColor: ['#ef4444', '#10b981', '#f59e0b', '#3b82f6'], // Red, Green, Yellow, Blue
            hoverBackgroundColor: ['#dc2626', '#059669', '#d97706', '#2563eb'],
            borderWidth: 0,
        }],
    };
    const options = { responsive: true, cutout: '70%', plugins: { legend: { display: true, position: 'bottom' } } };
    
    // Find the most frequent status to display in the center
    const mostFrequentStatus = labels.length > 0 ? labels.reduce((a, b) => statusData[a] > statusData[b] ? a : b) : 'None';
    const mostFrequentCount = statusData[mostFrequentStatus] || 0;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md relative h-full flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4 text-theme-pink">Appointments Status</h3>
            <div className="w-48 h-48 relative mt-4">
                <Doughnut data={data} options={options} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-3xl font-bold capitalize">{mostFrequentStatus.toLowerCase()}</p>
                    <p className="text-gray-500 text-lg">{mostFrequentCount}</p>
                </div>
            </div>
        </div>
    );
};
export default StatusDonutChart;