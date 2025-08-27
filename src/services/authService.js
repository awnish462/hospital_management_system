import axios from 'axios';
const API_URL = 'http://localhost:8080/api/auth';

const login = (username, password) => {
    // CORRECT: Ensure the axios Promise is returned
    return axios.post(`${API_URL}/login`, { username, password });
};

const register = (userData) => {
    // CORRECT: Ensure the axios Promise is returned
    return axios.post(`${API_URL}/register`, userData);
};

const getAllUsers = () => {
    // CORRECT: Ensure the axios Promise is returned
    return axios.get(`${API_URL}/users`);
};
const signup = (signupData) => {
    // signupData should be an object with { name, age, gender, username, password }
    return axios.post(`${API_URL}/signup`, signupData);
};

const authService = {
    login,
    register,
    getAllUsers,
    signup
};

export default authService;