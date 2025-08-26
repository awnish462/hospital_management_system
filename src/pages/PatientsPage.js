import React, { useState, useEffect } from "react";
import axios from "axios";
// Import useNavigate
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import patientService from "../services/patientService";

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = () => {
    patientService
      .getAllPatients()
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the patients!", error);
      });
  };

  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
  });
  // Initialize the navigate function
  const navigate = useNavigate();

  // ... (keep the handleInputChange and handleAddPatient functions as they are)
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewPatient((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();
    if (!newPatient.name || !newPatient.age || !newPatient.gender) {
      alert("Please fill in all fields.");
      return;
    }

    patientService
      .createPatient(newPatient)
      .then(() => {
        // After successfully creating, fetch the updated list of patients
        fetchPatients();
        // Reset the form
        setNewPatient({ name: "", age: "", gender: "" });
      })
      .catch((error) => {
        console.error("There was an error creating the patient!", error);
      });
  };

  const handleRowClick = (patientId) => {
    navigate(`/patients/${patientId}`);
  };

  return (
    <div className="p-8">
      {/* ... (The registration form remains the same) */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Patient Management
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Register New Patient</h2>
        {/* The form JSX is unchanged */}
        <form
          onSubmit={handleAddPatient}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <Input
            label="Full Name"
            id="name"
            value={newPatient.name}
            onChange={handleInputChange}
            placeholder="John Doe"
          />
          <Input
            label="Age"
            id="age"
            type="number"
            value={newPatient.age}
            onChange={handleInputChange}
            placeholder="45"
          />
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              value={newPatient.gender}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="self-end">
            <Button type="submit">Add Patient</Button>
          </div>
        </form>
      </div>

      {/* Patient List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Registered Patients</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Patient ID
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Name
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Age
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Gender
                </th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                // Add onClick event and cursor style
                <tr
                  key={patient.id}
                  className="border-b hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRowClick(patient.id)}
                >
                  <td className="py-3 px-4">{patient.id}</td>
                  <td className="py-3 px-4">{patient.name}</td>
                  <td className="py-3 px-4">{patient.age}</td>
                  <td className="py-3 px-4">{patient.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;
