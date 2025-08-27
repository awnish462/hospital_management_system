import React from 'react';

// A small sub-component for the colorful status badges
const StatusBadge = ({ status }) => {
    const base = "px-3 py-1 text-xs font-semibold rounded-full text-white capitalize";
    let color = "";
    switch (status) {
        case 'COMPLETED': color = 'bg-theme-green-status'; break;
        case 'PENDING': color = 'bg-theme-yellow-status'; break;
        case 'INVOICED': color = 'bg-blue-500'; break;
        case 'CANCELLED': color = 'bg-theme-red-status'; break;
        default: color = 'bg-gray-400';
    }
    return <span className={`${base} ${color}`}>{status.toLowerCase()}</span>;
};

const AppointmentsTable = ({ appointments }) => (
    <div className="bg-white p-6 rounded-lg shadow-md col-span-2 h-full">
        <h3 className="text-xl font-bold mb-4 text-theme-pink">Recent Appointments</h3>
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead className="border-b-2">
                    <tr>
                        <th className="text-left py-2 font-semibold text-gray-600">Patient</th>
                        <th className="text-left py-2 font-semibold text-gray-600">Doctor</th>
                        <th className="text-left py-2 font-semibold text-gray-600">Check-Up</th>
                        <th className="text-left py-2 font-semibold text-gray-600">Date</th>
                        <th className="text-left py-2 font-semibold text-gray-600">Time</th>
                        <th className="text-left py-2 font-semibold text-gray-600">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(app => (
                        <tr key={app.id} className="border-b hover:bg-gray-50">
                            <td className="py-3">{app.patient.name}</td>
                            <td className="py-3">{app.doctor.name}</td>
                            <td className="py-3">{app.reason}</td>
                            <td className="py-3">{app.date}</td>
                            <td className="py-3">{app.time}</td>
                            <td className="py-3"><StatusBadge status={app.status} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);
export default AppointmentsTable;