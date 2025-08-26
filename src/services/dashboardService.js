import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/dashboard';

const dashboardService = {
    getDashboardStats: () => {
        return axios.get(`${API_BASE_URL}/stats`);
    }
};

export default dashboardService;