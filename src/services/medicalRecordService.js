import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/records';

const medicalRecordService = {
    getRecordsByPatientId: (patientId) => {
        return axios.get(`${API_BASE_URL}/patient/${patientId}`);
    },

    createRecord: (recordData) => {
        return axios.post(API_BASE_URL, recordData);
    }
};

export default medicalRecordService;