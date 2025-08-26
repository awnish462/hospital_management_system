import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import DoctorsPage from './pages/DoctorsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import PatientDetailPage from './pages/PatientDetailPage';
import BillingPage from './pages/BillingPage'; 
import PharmacyPage from './pages/PharmacyPage'; 

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/patients" element={<PatientsPage />} />
            {/* Add the dynamic route for a single patient */}
            <Route path="/patients/:patientId" element={<PatientDetailPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/pharmacy" element={<PharmacyPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;