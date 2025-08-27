import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import Input from '../components/Input';
import Button from '../components/Button';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSignup = (e) => {
        e.preventDefault();
        setError('');

        authService.signup(formData)
            .then(response => {
                // The backend returns a login response, so we can log the user in immediately
                const { token, username, role } = response.data;
                login({ username, role }, token);
                navigate('/'); // Redirect to their new portal dashboard
            })
            .catch(err => {
                setError('Signup failed. The username may already be taken.');
                console.error("Signup error:", err);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Your Patient Account</h2>
                <form onSubmit={handleSignup} className="space-y-4">
                    <Input label="Full Name" id="name" value={formData.name} onChange={handleInputChange} required />
                    <Input label="Age" id="age" type="number" value={formData.age} onChange={handleInputChange} required />
                    <div>
                         <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                        <select id="gender" value={formData.gender} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm">
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <hr className="my-4"/>
                    <Input label="Username" id="username" value={formData.username} onChange={handleInputChange} required />
                    <Input label="Password" id="password" type="password" value={formData.password} onChange={handleInputChange} required />
                    
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    
                    <Button type="submit" className="w-full !mt-6">Sign Up</Button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account? <Link to="/login" className="font-semibold text-blue-600 hover:underline">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;