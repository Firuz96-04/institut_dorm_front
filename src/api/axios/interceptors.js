import instances from './instances';
import AuthService from '@/service/auth-service';
import TokenService from '@/service/token-service'
import {useAuthStore} from '@/store/auth'
const setup = () => {
    instances.interceptors.request.use(
        (config) => {
            const token = AuthService.getLocalAccessToken();
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    instances.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalConfig = error.config;
            if (error.response) {
                if (error.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    try {
                        const rs = await instances.post("/api/token/refresh/", {
                            refresh: TokenService.getLocalRefreshToken()
                          })
                        
                        const { access } = rs.data;
                        const useStore = useAuthStore()

                        useStore.refreshToken(access)
                        TokenService.updateLocalAccessToken(access)
                        // instances.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                        
                        return instances(originalConfig);
                    } catch (_error) {
                        if (_error.response && _error.response.data) {
                            return Promise.reject(_error.response.data);
                        }
                        return Promise.reject(_error);
                    }
                }

                if (error.response.status === 400 && error.response.data.error == 'user_not_found') {
                    alert('Этот ползовател не найден');
                    return Promise.reject(error.response.data);
                }
            }
            return Promise.reject(error);
        }
    );
};

export default setup;

// export { instances as http };
