import React, { useState, useEffect } from 'react';
import Calendar from '../components/Calendar';
import Button from '../components/Button';

// Import all the services we need for this page
import appointmentService from '../services/appointmentService';
import patientService from '../services/patientService';
import doctorService from '../services/doctorService';

const AppointmentsPage = () => {
    // State for data fetched from the backend
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    // State for the form and calendar
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [appointmentData, setAppointmentData] = useState({
        patientId: '',
        doctorId: '',
        time: '',
    });

    // Function to fetch all necessary data from the backend
    const fetchData = () => {
        appointmentService.getAllAppointments()
            .then(response => setAppointments(response.data))
            .catch(error => console.error("Error fetching appointments:", error));

        patientService.getAllPatients()
            .then(response => setPatients(response.data))
            .catch(error => console.error("Error fetching patients:", error));

        doctorService.getAllDoctors()
            .then(response => setDoctors(response.data))
            .catch(error => console.error("Error fetching doctors:", error));
    };

    // useEffect to fetch all data when the component first loads
    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setAppointmentData((prev) => ({ ...prev, [id]: value }));
    };

    const handleBookAppointment = (e) => {
        e.preventDefault();
        const { patientId, doctorId, time } = appointmentData;

        if (!patientId || !doctorId || !time || !selectedDate) {
            alert('Please select a patient, doctor, time, and date.');
            return;
        }

        // Prepare the data object that matches our Spring Boot DTO
        const newAppointmentRequest = {
            patientId: Number(patientId),
            doctorId: Number(doctorId),
            date: selectedDate,
            time,
        };

        // Call the service to create the appointment
        appointmentService.createAppointment(newAppointmentRequest)
            .then(() => {
                // After success, re-fetch all data to update the UI
                fetchData();
                // Reset the form
                setAppointmentData({ patientId: '', doctorId: '', time: '' });
            })
            .catch(error => {
                console.error("There was an error booking the appointment!", error);
                alert("Failed to book appointment. Please check the console for errors.");
            });
    };
    
    // Filter appointments for the selected date to display in the table
    const appointmentsForSelectedDate = appointments.filter(app => app.date === selectedDate);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Appointment Booking</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left/Main Column */}
                <div className="lg:col-span-2">
                    <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />

                    {/* Appointment List - now displays real data */}
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Scheduled Appointments for {selectedDate}</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Patient</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Doctor</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointmentsForSelectedDate.length > 0 ? (
                                        appointmentsForSelectedDate.map((app) => (
                                            <tr key={app.id} className="border-b hover:bg-gray-50">
                                                {/* Note: We access patient/doctor name from the nested objects */}
                                                <td className="py-3 px-4">{app.patient.name}</td>
                                                <td className="py-3 px-4">{app.doctor.name}</td>
                                                <td className="py-3 px-4">{app.time}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center py-4 text-gray-500">No appointments scheduled for this date.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column/Sidebar */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Book a New Appointment</h2>
                    <form onSubmit={handleBookAppointment} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input type="text" readOnly value={selectedDate} className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"/>
                        </div>
                        {/* Patient Dropdown - now populated with real data */}
                        <div>
                            <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">Patient</label>
                            <select id="patientId" value={appointmentData.patientId} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Select a Patient</option>
                                {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                            </select>
                        </div>
                        {/* Doctor Dropdown - now populated with real data */}
                        <div>
                            <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700">Doctor</label>
                            <select id="doctorId" value={appointmentData.doctorId} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Select a Doctor</option>
                                {doctors.map(d => <option key={d.id} value={d.id}>{d.name} ({d.specialization})</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                            <select id="time" value={appointmentData.time} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Select a Time Slot</option>
                                <option value="09:00 AM">09:00 AM</option>
                                <option value="10:00 AM">10:00 AM</option>
                                <option value="11:00 AM">11:00 AM</option>
                                <option value="02:00 PM">02:00 PM</option>
                            </select>
                        </div>
                        <Button type="submit" className="w-full">Book Appointment</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AppointmentsPage;