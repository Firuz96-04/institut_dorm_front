import axios from 'axios';

let baseURL = '';

if (process.env.NODE_ENV == 'prodcution') {
    baseURL = 'https://ttjapi.buxdtu.uz'
} else {
    baseURL = 'https://ttjapi.buxdtu.uz'
}

// https://ttjapi.buxdtu.uz

const instance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default instance;