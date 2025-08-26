import React from 'react';
import { Link } from 'react-router-dom';
import { FaHospital } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <FaHospital className="text-3xl" />
          <span className="text-2xl font-bold">Hospital Management</span>
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-200">Dashboard</Link>
          <Link to="/patients" className="hover:text-blue-200">Patients</Link>
          <Link to="/doctors" className="hover:text-blue-200">Doctors</Link>
          <Link to="/appointments" className="hover:text-blue-200">Appointments</Link>
          <Link to="/billing" className="hover:text-blue-200">Billing</Link>
          <Link to="/pharmacy" className="hover:text-blue-200">Pharmacy</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;