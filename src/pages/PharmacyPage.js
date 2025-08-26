import React, { useState, useEffect } from 'react';
import pharmacyService from '../services/pharmacyService';
import Button from '../components/Button'; // We might use this for actions later

const PharmacyPage = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPrescriptions = () => {
        setIsLoading(true);
        pharmacyService.getActivePrescriptions()
            .then(response => {
                setPrescriptions(response.data);
            })
            .catch(error => {
                console.error("Error fetching prescriptions:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchPrescriptions();
    }, []);

    if (isLoading) {
        return <div className="p-8 text-center">Loading prescriptions...</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Pharmacy Management</h1>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Pending Prescriptions</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Date</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Patient</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Prescription</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Prescribed By</th>
                                <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prescriptions.length > 0 ? (
                                prescriptions.map(rx => (
                                    <tr key={rx.id} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4">{rx.date}</td>
                                        <td className="py-3 px-4">{rx.patient.name}</td>
                                        <td className="py-3 px-4 font-mono">{rx.prescription}</td>
                                        <td className="py-3 px-4">{rx.doctor.name}</td>
                                        <td className="py-3 px-4 text-center">
                                            <Button
                                                onClick={() => alert(`Fulfilling prescription for ${rx.patient.name}`)}
                                                className="bg-green-600 hover:bg-green-700"
                                            >
                                                Mark as Fulfilled
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-gray-500">
                                        No pending prescriptions.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PharmacyPage;