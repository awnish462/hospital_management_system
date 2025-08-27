import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/portal';

const getMyDetails = () => {
    return axios.get(`${API_BASE_URL}/my-details`);
};

const bookAppointment = (appointmentData) => {
    // Notice we only send doctorId, date, and time. Patient info is handled by the backend.
    return axios.post(`${API_BASE_URL}/my-appointments`, appointmentData);
};

const portalService = {
    getMyDetails,
    bookAppointment
};

export default portalService;