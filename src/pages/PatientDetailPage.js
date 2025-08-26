import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaUserCircle, FaPlusCircle } from 'react-icons/fa';
import Button from '../components/Button';

// Import our new services
import patientService from '../services/patientService'; // We need this to get patient details
import medicalRecordService from '../services/medicalRecordService';

const PatientDetailPage = () => {
    const { patientId } = useParams();

    // State for all data on this page
    const [patient, setPatient] = useState(null);
    const [records, setRecords] = useState([]);
    const [newRecord, setNewRecord] = useState({ diagnosis: '', notes: '', prescription: '' });

    // Function to fetch all page data
    const fetchPatientData = () => {
        // Fetch patient details (we need to add a getById method to patientService)
        patientService.getPatientById(patientId)
            .then(response => setPatient(response.data))
            .catch(error => console.error("Error fetching patient details:", error));
        
        // Fetch medical records for this patient
        medicalRecordService.getRecordsByPatientId(patientId)
            .then(response => setRecords(response.data))
            .catch(error => console.error("Error fetching medical records:", error));
    };

    // useEffect to run fetch function on component load
    useEffect(() => {
        fetchPatientData();
    }, [patientId]); // Re-run if patientId changes

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNewRecord(prev => ({ ...prev, [id]: value }));
    };

    const handleAddRecord = (e) => {
        e.preventDefault();
        if (!newRecord.diagnosis || !newRecord.notes) {
            alert("Please fill in diagnosis and notes.");
            return;
        }

        const recordRequest = {
            patientId: Number(patientId),
            doctorId: 1, // Hardcoded for now. In a real app, this would be the logged-in doctor's ID.
            ...newRecord
        };

        medicalRecordService.createRecord(recordRequest)
            .then(() => {
                // After success, re-fetch data and reset form
                fetchPatientData();
                setNewRecord({ diagnosis: '', notes: '', prescription: '' });
            })
            .catch(error => console.error("Error creating record:", error));
    };

    // Render a loading state while fetching data
    if (!patient) {
        return <div className="p-8 text-center">Loading patient data...</div>;
    }

    return (
        <div className="p-8">
            {/* Patient Header */}
            <div className="flex items-center mb-8">
                <FaUserCircle className="text-6xl text-gray-400 mr-4" />
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">{patient.name}</h1>
                    <p className="text-gray-600">
                        {patient.age} years old, {patient.gender}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Medical Records Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Add New Medical Record</h2>
                        <form onSubmit={handleAddRecord} className="space-y-4">
                            <div>
                                <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700">Diagnosis</label>
                                <input type="text" id="diagnosis" value={newRecord.diagnosis} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                            </div>
                            <div>
                                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                                <textarea id="notes" rows="3" value={newRecord.notes} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
                            </div>
                            <div>
                                <label htmlFor="prescription" className="block text-sm font-medium text-gray-700">Prescription (Optional)</label>
                                <textarea id="prescription" rows="2" value={newRecord.prescription} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
                            </div>
                            <Button type="submit" className="inline-flex items-center">
                                <FaPlusCircle className="mr-2"/> Add Record
                            </Button>
                        </form>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Medical History</h2>
                        <div className="space-y-4">
                            {records.length > 0 ? records.map(record => (
                                <div key={record.id} className="bg-white p-5 rounded-lg shadow">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-bold text-blue-600">{record.diagnosis}</h3>
                                    <span className="text-sm font-medium text-gray-500">{record.date}</span>
                                </div>
                                <p className="text-gray-700 mb-2">{record.notes}</p>
                                {record.prescription && (
                                    <p className="text-sm text-gray-600 bg-gray-100 p-2 rounded">
                                        <strong>Prescription:</strong> {record.prescription}
                                    </p>
                                )}
                                <p className="text-right text-sm text-gray-500 mt-2">Attending: {record.doctor.name}</p>
                                </div>
                            )) : <p>No medical records found.</p>}
                        </div>
                    </div>
                </div>
                
                {/* Sidebar (Placeholder) */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Upcoming Appointments</h2>
                    <div className="text-center text-gray-500">
                        <p>No upcoming appointments.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDetailPage;