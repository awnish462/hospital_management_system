import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/pharmacy';

const pharmacyService = {
    getActivePrescriptions: () => {
        return axios.get(`${API_BASE_URL}/prescriptions`);
    }
};

export default pharmacyService;