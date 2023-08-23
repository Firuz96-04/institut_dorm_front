import axios from 'axios';

let baseURL = '';

if (process.env.NODE_ENV == 'prodcution') {
    baseURL = 'http://localhost:8000'
} else {
    baseURL = 'http://localhost:8000'
}

const instance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default instance;