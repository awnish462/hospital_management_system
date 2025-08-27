import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(true); // Add a loading state

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            try {
                // Set the user state from localStorage
                setUser(JSON.parse(storedUser));
                // IMPORTANT: Set the default auth header for all future axios requests
                axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            } catch (error) {
                console.error("Failed to parse user from localStorage", error);
                // Clear corrupted storage
                localStorage.clear();
            }
        }
        setIsLoading(false); // Finished checking localStorage, set loading to false
    }, []);

    // Function to handle user login
    const login = (userData, userToken) => {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userToken);
        setUser(userData);
        setToken(userToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
    };

    // Function to handle user logout
    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    // The value that will be available to all consuming components
    const value = {
        user,
        token,
        login,
        logout,
        isLoading, // Provide loading state
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Create a custom hook for easy access to the context
export const useAuth = () => {
    return useContext(AuthContext);
};