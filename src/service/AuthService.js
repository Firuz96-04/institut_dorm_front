import {http} from '../api/axios/interceptors'
export default class Server{

    signin() {
        return http.post("/api/token/", {
            email: "lll@gmail.com",
            password: "lll_12345",
        });
    }
    async login() {
        // console.log('tessssss');
        try {
            const res = await this.signin()
            console.log(res);
            const { access, refresh } = res.data;
            localStorage.setItem("accessToken", access);
            localStorage.setItem("refreshToken", refresh);
        } catch (error) {
            console.log(error, 'error');
        }
    }
    getLocalAccessToken() {
        const accessToken = localStorage.getItem("accessToken");
        return accessToken;
    }
    getLocalRefreshToken() {
        const refreshToken = localStorage.getItem("refreshToken");
        return refreshToken;
    }
}
