import {baseurl, CONFIG} from "../utils/apiConfig";
import axios from 'axios';

const PAYMENT_ENDPOINT = baseurl('payments/');

const paymentService = {
    getSocioPayment: async (socioId) => {
        try {
            const response = await axios.get(PAYMENT_ENDPOINT.concat(`socio/${socioId}`), CONFIG);
            return response;
        } catch (error) {
            throw error;
        }
    },

    createPayment: async (paymentData) => {
        try {
        const response = await axios.post(PAYMENT_ENDPOINT, paymentData);
        return response;
        } catch (error) {
        throw error;
        }
    },

    deletePayment: async (id) => {
        try {
            const response = await axios.delete(PAYMENT_ENDPOINT.concat(id), CONFIG);
            return response;
        } catch (error) {
            throw error;
        }
    },
    
}

export default paymentService;