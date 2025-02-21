import {baseurl, CONFIG} from "../utils/apiConfig";
import axios from 'axios';

const SOCIO_ENDPOINT = baseurl('socios/');

const socioService = {
    getAllSocios: async () => {
        try {
            const response = await axios.get(SOCIO_ENDPOINT, CONFIG);
            return response;
        } catch (error) {
            throw error;
        }
    },

    createSocio: async (formData) => {
        try {
            const response = await axios.post(SOCIO_ENDPOINT, formData, CONFIG);
            return response;
        } catch (error) {
            throw error;
        }
    },

    deleteSocio: async (id) => {
        try {
            const response = await axios.delete(SOCIO_ENDPOINT.concat(id), CONFIG);
            return response;
        } catch (error) {
            throw error;
        }
    },

    updateSocio: async (id, formData) => {
        try {
            const response = await axios.put(SOCIO_ENDPOINT.concat(id), formData, CONFIG);
            return response;
        } catch (error) {
            throw error;
        }
    },

    enrollSocioInClass: async (socioId, classId) => {
        try {
            const response = await axios.post(
                SOCIO_ENDPOINT.concat(socioId).concat(`/enroll/`).concat(classId)
                , CONFIG
            );
            return response;
        } catch (error) {
            throw error;
        }
    },


}

export default socioService;