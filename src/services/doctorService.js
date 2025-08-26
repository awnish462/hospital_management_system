import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/doctors';

const doctorService = {
    // Fetches all doctors from the backend
    getAllDoctors: () => {
        return axios.get(API_BASE_URL);
    },

    // Creates a new doctor
    createDoctor: (doctorData) => {
        return axios.post(API_BASE_URL, doctorData);
    }
    // We can add more methods later
};

export default doctorService;