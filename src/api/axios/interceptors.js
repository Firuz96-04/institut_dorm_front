import instances from './instances'
import AuthService from '../../service/auth-service'

instances.interceptors.request.use(
    (config) => {
        const token = AuthService.getLocalAccessToken()
        // console.log( server.getLocalAccessToken(), 'accessssss');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        } 
        // else {
        //     console.log('request is sent');
        // }
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
        if (error.response) {
            if (error.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true
                
                try {
                    const rs = await AuthService.refreshToken()
                    const {access} = rs.data
                    localStorage.setItem('accessToken', access)
                    instances.defaults.headers.common["Authorization"] = `Bearer ${access}`;
                    return instances(originalConfig)
                    
                } catch (_error) {
                    if (_error.response && _error.response.data) {
                        return Promise.reject(_error.response.data);
                      }
                      return Promise.reject(_error);
                }
            }

            if (error.response.status === 400 && error.response.data.error == 'user_not_found') {
                // console.log(error.response.data.error, '400');
                alert('Этот ползовател не найден')
                return Promise.reject(error.response.data)
            }
        }
        return Promise.reject(error)
    }
);

// instances.interceptors.response.use(
//     (res) => {
//       return res;
//     },
//     async (err) => {
//       const originalConfig = err.config;
  
//       if (err.response) {
//         // Access Token was expired
//         if (err.response.status === 401 && !originalConfig._retry) {
//           originalConfig._retry = true;
  
//           try {
//             const server = new Server();
//             const refresh = server.getLocalRefreshToken()
//             const rs = await refresh();
//             const { accessToken } = rs.data;
//             window.localStorage.setItem("accessToken", accessToken);
//             instances.defaults.headers.common["Bearer"] = accessToken;
  
//             return instances(originalConfig);
//           } catch (_error) {
//             if (_error.response && _error.response.data) {
//               return Promise.reject(_error.response.data);
//             }
  
//             return Promise.reject(_error);
//           }
//         }
  
//         if (err.response.status === 403 && err.response.data) {
//           return Promise.reject(err.response.data);
//         }
//       }
  
//       return Promise.reject(err);
//     }
//   );





export { instances as http };
