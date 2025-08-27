// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8080/api/dashboard';

// const dashboardService = {
//     getDashboardStats: () => {
//         return axios.get(`${API_BASE_URL}/stats`);
//     }
// };

// export default dashboardService;

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/dashboard';

// This is the only function we need for this page
const getEnhancedDashboardData = () => {
    // Point to the new '/enhanced-data' endpoint
    return axios.get(`${API_BASE_URL}/enhanced-data`);
};

const dashboardService = {
    getEnhancedDashboardData
};

export default dashboardService;