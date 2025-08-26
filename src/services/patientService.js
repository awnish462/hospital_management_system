import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/patients';

const patientService = {
    // Fetches all patients from the backend
    getAllPatients: () => {
        return axios.get(API_BASE_URL);
    },

    // Creates a new patient
    createPatient: (patientData) => {
        return axios.post(API_BASE_URL, patientData);
    },

    // We will add getById, update, and delete methods here later
    getPatientById: (id) => {
        return axios.get(`${API_BASE_URL}/${id}`);
    }
};
export default patientService;