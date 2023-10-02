import {http} from '../api/axios/interceptors'
import instances from '@/api/axios/instances'
class AuthService{

    login(user) {
        return instances.post("/api/token/", {
                        email: user.email,
                        password: user.password
                        })
                .then(response => {
                    if(response.data.access) {
                        const person = JSON.stringify(response.data)
                        localStorage.setItem('user', person)
                        const { access, refresh } = response.data;
                        
                        localStorage.setItem("accessToken", access);
                        localStorage.setItem("refreshToken", refresh);     
                    }
                    return response.data
                })
                .catch(error => {
                        return Promise.reject(error)
                })
    }

    // async login(user) {
    //     try {
    //         const res = await http.post("/api/token/", {
    //             email: user.email,
    //             password: user.password
    //             })   
    //         const person = JSON.stringify(res.data)
    //         localStorage.setItem('user', person)
    //         const { access, refresh } = res.data;
            
    //         localStorage.setItem("accessToken", access);
    //         localStorage.setItem("refreshToken", refresh);
    //         return res.data
    //     } catch (error) {
    //         console.log(error, 'error');
    //     }
    // }

    logout() {
        localStorage.removeItem('user')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        
    }
    getLocalAccessToken() {
        const accessToken = localStorage.getItem("accessToken");
        return accessToken;
    }
    getLocalRefreshToken() {
        const refreshToken = localStorage.getItem("refreshToken");
        return refreshToken;
    }

    refreshToken() {

        return http.post("/api/token/refresh/", {
          refresh: this.getLocalRefreshToken()
        });
      }

}

export default new AuthService()