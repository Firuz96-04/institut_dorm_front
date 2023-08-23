import instances from './instances'
import Server from '../../service/AuthService'

instances.interceptors.request.use(
    (config) => {
        const server = new Server();
        const token = server.getLocalAccessToken()
        // console.log( server.getLocalAccessToken(), 'accessssss');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        } else {
            console.log('request is sent');
        }
        return config;
},
    (error) => {
        return Promise.reject(error)
    }

)
instances.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalConfig = error.config
        // const error_message = error.response.data
        // console.log(error_message, 'message');
        if (error.response) {
            if (error.response.status === 401 && !originalConfig._retry) {
                console.log('401 error');
                originalConfig._retry = true
                return instances(originalConfig)
            }

            // if (error.response.status === ANOTHER_STATUS_CODE) {
            //     return Promise.reject(error.response.data)
            // }
        }
        return Promise.reject(error)
    }
);


export { instances as http };
