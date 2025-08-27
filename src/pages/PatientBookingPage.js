import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import portalService from '../services/portalService';
import doctorService from '../services/doctorService'; // We still need this to get the doctor list
import Button from '../components/Button';
import Calendar from '../components/Calendar'; // We can reuse the calendar component

const PatientBookingPage = () => {
    const [myDetails, setMyDetails] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [appointmentData, setAppointmentData] = useState({ doctorId: '', time: '' });
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the logged-in patient's own details
        portalService.getMyDetails()
            .then(response => setMyDetails(response.data))
            .catch(error => console.error("Error fetching patient details:", error));
        
        // Fetch the list of all doctors
        doctorService.getAllDoctors()
            .then(response => setDoctors(response.data))
            .catch(error => console.error("Error fetching doctors:", error));
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setAppointmentData(prev => ({ ...prev, [id]: value }));
    };

    const handleBookAppointment = (e) => {
        e.preventDefault();
        const bookingRequest = {
            ...appointmentData,
            date: selectedDate,
        };
        portalService.bookAppointment(bookingRequest)
            .then(() => {
                alert('Appointment requested successfully! You will be notified upon confirmation.');
                navigate('/'); // Redirect to dashboard
            })
            .catch(err => alert('Failed to book appointment.'));
    };

    if (!myDetails) {
        return <div className="p-8">Loading your information...</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Book a New Appointment</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Your Details</h2>
                    <form onSubmit={handleBookAppointment} className="space-y-4">
                        {/* Patient name is now displayed as text, not a dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                            <p className="mt-1 text-lg font-semibold p-2 bg-gray-100 rounded-md">{myDetails.name}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <p className="mt-1 p-2 bg-gray-100 rounded-md">{selectedDate}</p>
                        </div>
                        <div>
                            <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700">Select a Doctor</label>
                            <select id="doctorId" value={appointmentData.doctorId} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm">
                                <option value="">Choose a doctor</option>
                                {doctors.map(d => <option key={d.id} value={d.id}>{d.name} ({d.specialization})</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Select a Time</label>
                            <select id="time" value={appointmentData.time} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm">
                                <option value="">Choose a time slot</option>
                                <option value="09:00 AM">09:00 AM</option>
                                <option value="10:00 AM">10:00 AM</option>
                                <option value="11:00 AM">11:00 AM</option>
                            </select>
                        </div>
                        <Button type="submit" className="w-full !mt-6">Request Appointment</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PatientBookingPage;