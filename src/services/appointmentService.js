import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/appointments';

const appointmentService = {
    // Fetches all appointments
    getAllAppointments: () => {
        return axios.get(API_BASE_URL);
    },

    // Creates a new appointment
    // The appointmentData object should contain: { patientId, doctorId, date, time }
    createAppointment: (appointmentData) => {
        return axios.post(API_BASE_URL, appointmentData);
    }
};

export default appointmentService;