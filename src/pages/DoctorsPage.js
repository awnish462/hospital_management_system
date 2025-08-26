import React, { useState, useEffect } from 'react';
import DoctorCard from '../components/DoctorCard';
import Input from '../components/Input';
import Button from '../components/Button';
// Import our new doctor service
import doctorService from '../services/doctorService';

const DoctorsPage = () => {
  // 'doctors' state will be populated from the API
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({ name: '', specialization: '' });

  // Function to fetch doctors from the backend
  const fetchDoctors = () => {
    doctorService.getAllDoctors()
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the doctors!", error);
      });
  };

  // useEffect to fetch doctors when the component mounts
  useEffect(() => {
    fetchDoctors();
  }, []); // Empty array ensures this runs only once

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewDoctor(prev => ({ ...prev, [id]: value }));
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();
    if (!newDoctor.name || !newDoctor.specialization) {
      alert("Please fill in all fields.");
      return;
    }

    doctorService.createDoctor(newDoctor)
      .then(() => {
        // After creating, refresh the list and reset the form
        fetchDoctors();
        setNewDoctor({ name: '', specialization: '' });
      })
      .catch(error => {
        console.error("There was an error creating the doctor!", error);
      });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Doctor Management</h1>

      {/* Add New Doctor Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add New Doctor</h2>
        <form onSubmit={handleAddDoctor} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <Input
            label="Full Name"
            id="name"
            value={newDoctor.name}
            onChange={handleInputChange}
            placeholder="Dr. John Smith"
          />
          <Input
            label="Specialization"
            id="specialization"
            value={newDoctor.specialization}
            onChange={handleInputChange}
            placeholder="Cardiology"
          />
          <Button type="submit">Add Doctor</Button>
        </form>
      </div>

      {/* Display Doctor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {doctors.map((doctor) => (
          // We need to adjust DoctorCard to handle potentially missing fields
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default DoctorsPage;