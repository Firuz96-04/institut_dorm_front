// import {http} from '../api/axios/interceptors'
import instances from '@/api/axios/instances'
import TokenService from "./token-service";
class AuthService{

    login(user) {
        return instances.post("/api/token/", {
                        email: user.email,
                        password: user.password
                        })
                .then(response => {
                    if(response.data.access) {
                        // const person = JSON.stringify(response.data)
                        // localStorage.setItem('user', person)
                        TokenService.setUser(response.data)
                        // const { access, refresh } = response.data;
                        
                        // localStorage.setItem("access", access);
                        // localStorage.setItem("refresh", refresh);     
                    }
                    return response.data
                })
                .catch(error => {
                        return Promise.reject(error)
                })
    }

    logout() {
        localStorage.removeItem('user')
    }

    getLocalAccessToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.access;
    }
    
    getLocalRefreshToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.refresh;
    }

    refreshToken() {
        return instances.post("/api/token/refresh/", {
          refresh: this.getLocalRefreshToken()
        });
      }

}

export default new AuthService()