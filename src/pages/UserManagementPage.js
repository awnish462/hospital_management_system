// in src/pages/UserManagementPage.js
import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', password: '', role: 'ROLE_DOCTOR' });
    const { user } = useAuth();

    const fetchUsers = () => {
        authService.getAllUsers().then(response => setUsers(response.data));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNewUser(prev => ({ ...prev, [id]: value }));
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        authService.register(newUser)
            .then(() => {
                alert('User created successfully!');
                fetchUsers(); // Refresh the list
                setNewUser({ username: '', password: '', role: 'ROLE_DOCTOR' });
            })
            .catch(err => alert('Failed to create user.'));
    };

    // This check is a second layer of defense on the frontend
    if (user?.role !== 'ROLE_ADMIN') {
        return <div className="p-8">Access Denied. This page is for Admins only.</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">User Management</h1>
            {/* Add New User Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4">Create New User</h2>
                <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <Input label="Username" id="username" value={newUser.username} onChange={handleInputChange} />
                    <Input label="Password" id="password" type="password" value={newUser.password} onChange={handleInputChange} />
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                        <select id="role" value={newUser.role} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm">
                            <option value="ROLE_DOCTOR">Doctor</option>
                            <option value="ROLE_RECEPTIONIST">Receptionist</option>
                            <option value="ROLE_PHARMACIST">Pharmacist</option>
                            <option value="ROLE_ADMIN">Admin</option>
                        </select>
                    </div>
                    <Button type="submit">Create User</Button>
                </form>
            </div>

            {/* Existing Users List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Existing Users</h2>
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Username</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id} className="border-b">
                                <td className="py-3 px-4">{u.username}</td>
                                <td className="py-3 px-4">{u.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagementPage;