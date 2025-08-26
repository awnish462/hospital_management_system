import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/billing';

const billingService = {
    getBillableAppointments: () => {
        return axios.get(`${API_BASE_URL}/billable`);
    },

    getAllInvoices: () => {
        return axios.get(`${API_BASE_URL}/invoices`);
    },

    createInvoice: (appointmentId) => {
        return axios.post(`${API_BASE_URL}/invoice/${appointmentId}`);
    }
};

export default billingService;