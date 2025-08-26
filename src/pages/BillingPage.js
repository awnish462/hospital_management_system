import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import billingService from '../services/billingService';

const BillingPage = () => {
    const [billableAppointments, setBillableAppointments] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = () => {
        setIsLoading(true);
        // Use Promise.all to fetch both sets of data concurrently
        Promise.all([
            billingService.getBillableAppointments(),
            billingService.getAllInvoices()
        ]).then(([billableRes, invoicesRes]) => {
            setBillableAppointments(billableRes.data);
            setInvoices(invoicesRes.data);
        }).catch(error => {
            console.error("Error fetching billing data:", error);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleGenerateInvoice = (appointmentId) => {
        billingService.createInvoice(appointmentId)
            .then(() => {
                // After success, refresh all data
                fetchData();
            })
            .catch(error => {
                console.error("Error generating invoice:", error);
                alert("Failed to generate invoice.");
            });
    };

    if (isLoading) {
        return <div className="p-8 text-center">Loading billing information...</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Billing and Invoicing</h1>

            {/* Section for Appointments to be Billed */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4">Pending Bills</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Patient</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Doctor</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Date</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Cost</th>
                                <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {billableAppointments.length > 0 ? (
                                billableAppointments.map(app => (
                                    <tr key={app.id} className="border-b">
                                        <td className="py-3 px-4">{app.patient.name}</td>
                                        <td className="py-3 px-4">{app.doctor.name}</td>
                                        <td className="py-3 px-4">{app.date}</td>
                                        <td className="py-3 px-4">${app.cost.toFixed(2)}</td>
                                        <td className="py-3 px-4 text-center">
                                            <Button onClick={() => handleGenerateInvoice(app.id)}>
                                                Generate Invoice
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-gray-500">No pending bills.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Section for Generated Invoices */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Recent Invoices</h2>
                <div className="space-y-4">
                    {invoices.map(invoice => (
                        <div key={invoice.id} className="border p-4 rounded-lg flex justify-between items-center">
                            <div className="flex items-center">
                                <FaFileInvoiceDollar className="text-3xl text-green-500 mr-4"/>
                                <div>
                                    <p className="font-bold text-lg">Invoice #{invoice.id} - {invoice.appointment.patient.name}</p>
                                    <p className="text-gray-600">Amount: ${invoice.amount.toFixed(2)} | Dated: {invoice.invoiceDate}</p>
                                </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                invoice.status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                                {invoice.status}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BillingPage;