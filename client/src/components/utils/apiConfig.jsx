const API_URL = 'http://localhost:5050/api/';

export function baseurl(endpoint) {
    const local = API_URL;
    return `${local}${endpoint}`;
}

export const CONFIG = {
    headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    }
};