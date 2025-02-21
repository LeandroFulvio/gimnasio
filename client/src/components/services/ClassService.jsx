import {baseurl, CONFIG} from "../utils/apiConfig";
import axios from 'axios';

const CLASSES_ENDPOINT = baseurl('classes/');

const classService = {
    getAllClasses: async () => {
        try {
            const response = await axios.get(CLASSES_ENDPOINT, CONFIG);
            return response;
        } catch (error) {
            throw error;
        }
    },

    createClass: async (classData) => {
        try {
            const response = await axios.post(CLASSES_ENDPOINT, classData, CONFIG);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteClass: async (id) => {
        try {
            const response = await axios.delete(CLASSES_ENDPOINT.concat(id), CONFIG);
            return response;
        } catch (error) {
            throw error;
        }
    },

};
  
export default classService;