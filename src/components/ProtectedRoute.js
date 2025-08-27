import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useAuth();

    // While the context is checking for a user in localStorage, show a loading message.
    // This prevents a brief "flicker" to the login page on a page refresh.
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    // If loading is finished and there is still no user, redirect to the login page.
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If there is a user, render the child components (the actual page).
    return children;
};

export default ProtectedRoute;