// import React from 'react';
// import { Link,useNavigate } from 'react-router-dom';
// import { FaHospital } from 'react-icons/fa';

// const Navbar = () => {
//   return (
//     <nav className="bg-blue-600 text-white p-4 shadow-md">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="flex items-center space-x-2">
//           <FaHospital className="text-3xl" />
//           <span className="text-2xl font-bold">Hospital Management</span>
//         </Link>
//         <div className="space-x-4">
//           <Link to="/" className="hover:text-blue-200">Dashboard</Link>
//           <Link to="/patients" className="hover:text-blue-200">Patients</Link>
//           <Link to="/doctors" className="hover:text-blue-200">Doctors</Link>
//           <Link to="/appointments" className="hover:text-blue-200">Appointments</Link>
//           <Link to="/billing" className="hover:text-blue-200">Billing</Link>
//           <Link to="/pharmacy" className="hover:text-blue-200">Pharmacy</Link>
//           {user && user.role === 'ROLE_ADMIN' && (
//             <Link to="/admin/users" className="hover:text-blue-200">User Management</Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHospital } from "react-icons/fa";
// Import the useAuth hook we just created
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  // Now 'user' and 'logout' are correctly defined by calling the hook
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <FaHospital className="text-3xl" />
          <span className="text-2xl font-bold">Hospital Management</span>
        </Link>
        <div className="flex-grow flex items-center justify-center space-x-4">
          {/* These links will now correctly render based on the logged-in user */}
          <Link to="/" className="hover:text-blue-200">
            Dashboard
          </Link>
          <Link to="/patients" className="hover:text-blue-200">
            Patients
          </Link>
          <Link to="/doctors" className="hover:text-blue-200">
            Doctors
          </Link>
          {user && user.role === "ROLE_PATIENT" && (
            <Link to="/book-appointment" className="hover:text-blue-200">
              Book Appointment
            </Link>
          )}

          {/* Hide the admin appointment link from patients */}
          {user && user.role !== "ROLE_PATIENT" && (
            <Link to="/appointments" className="hover:text-blue-200">
              Appointments
            </Link>
          )}

          {user && user.role === "ROLE_ADMIN" && (
            <Link to="/billing" className="hover:text-blue-200">
              Billing
            </Link>
          )}
          {user &&
            (user.role === "ROLE_PHARMACIST" || user.role === "ROLE_ADMIN") && (
              <Link to="/pharmacy" className="hover:text-blue-200">
                Pharmacy
              </Link>
            )}
          {user && user.role === "ROLE_ADMIN" && (
            <Link to="/admin/users" className="hover:text-blue-200">
              User Management
            </Link>
          )}
        </div>
        <div>
          {/* Welcome message and Logout button */}
          <span className="mr-4">Welcome, {user?.username}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
