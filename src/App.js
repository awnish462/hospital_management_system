// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import DashboardPage from './pages/DashboardPage';
// import PatientsPage from './pages/PatientsPage';
// import DoctorsPage from './pages/DoctorsPage';
// import AppointmentsPage from './pages/AppointmentsPage';
// import PatientDetailPage from './pages/PatientDetailPage';
// import BillingPage from './pages/BillingPage'; 
// import PharmacyPage from './pages/PharmacyPage'; 
// import axios from 'axios';
// import UserManagementPage from './pages/UserManagementPage';
// import { AuthProvider, useAuth } from './context/AuthContext';

// axios.interceptors.request.use(
//   config => {
//     // Get the token from local storage
//     const token = localStorage.getItem('token');
//     // If the token exists, add it to the Authorization header
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     // Return the modified config
//     return config;
//   },
//   error => {
//     // Handle the error
//     return Promise.reject(error);
//   }
// );
// const AppLayout = () => {
//     const { user } = useAuth();
//     if (!user) return <Navigate to="/login" />;

//     return (
//         <div className="bg-gray-100 min-h-screen">
//             <Navbar />
//             <main className="container mx-auto p-4">
//                 <Outlet />
//             </main>
//         </div>
//     );
// };
// function App() {
//   return (
//     <Router>
//       <div className="bg-gray-100 min-h-screen">
//         <Navbar />
//         <main className="container mx-auto p-4">
//           <Routes>
//             <Route path="/" element={<DashboardPage />} />
//             <Route path="/patients" element={<PatientsPage />} />
//             {/* Add the dynamic route for a single patient */}
//             <Route path="/patients/:patientId" element={<PatientDetailPage />} />
//             <Route path="/doctors" element={<DoctorsPage />} />
//             <Route path="/appointments" element={<AppointmentsPage />} />
//             <Route path="/billing" element={<BillingPage />} />
//             <Route path="/pharmacy" element={<PharmacyPage />} />
//             <Route path="/users" element={<UserManagementPage />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
// Make sure Outlet and Navigate are imported from react-router-dom
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom'; 

import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import PatientDetailPage from './pages/PatientDetailPage';
import DoctorsPage from './pages/DoctorsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import BillingPage from './pages/BillingPage';
import PharmacyPage from './pages/PharmacyPage';
import UserManagementPage from './pages/UserManagementPage';
import LoginPage from './pages/LoginPage'; // <-- This import was missing
import ProtectedRoute from './components/ProtectedRoute'; // <-- This import was missing
import SignupPage from './pages/SignupPage';
import PatientBookingPage from './pages/PatientBookingPage';

const AppLayout = () => {
    const { user } = useAuth();
    // The isLoading check is a good addition to prevent flicker
    const { isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>; // Or a spinner component
    }

    if (!user) {
        // 'Navigate' is now defined thanks to the import above
        return <Navigate to="/login" />;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <main className="container mx-auto p-4">
                {/* 'Outlet' is now defined thanks to the import above */}
                <Outlet />
            </main>
        </div>
    );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 'LoginPage' is now defined */}
          <Route path="/login" element={<LoginPage />} />
           <Route path="/signup" element={<SignupPage />} />
          {/* 'ProtectedRoute' is now defined */}
          <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/patients/:patientId" element={<PatientDetailPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/pharmacy" element={<PharmacyPage />} />
            <Route path="/admin/users" element={<UserManagementPage />} />
            <Route path="/book-appointment" element={<PatientBookingPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;