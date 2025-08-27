import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import Input from '../components/Input';
import Button from '../components/Button';
import { FaHospital } from 'react-icons/fa';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        authService.login(username, password)
            .then(response => {
                const { token, username, role } = response.data;
                // The login function from AuthContext will store the user and token
                login({ username, role }, token);
                // Redirect to the dashboard after successful login
                navigate('/');
            })
            .catch(err => {
                setError('Invalid username or password. Please try again.');
                console.error("Login error:", err);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-2xl w-full max-w-sm">
                <div className="flex flex-col items-center mb-6">
                    <FaHospital className="text-5xl text-blue-600" />
                    <h2 className="text-2xl font-bold mt-4 text-gray-800">Hospital Management System</h2>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                    <Input 
                        label="Username" 
                        id="username" 
                        value={username} 
                        onChange={e => setUsername(e.target.value)} 
                        placeholder="Enter your username"
                    />
                    <Input 
                        label="Password" 
                        id="password" 
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        placeholder="Enter your password"
                    />
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <Button type="submit" className="w-full !mt-6">
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;