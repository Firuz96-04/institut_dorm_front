import { defineStore } from 'pinia';
import AuthService from '@/service/auth-service'

const user = JSON.parse(localStorage.getItem('user'));
// const initialState = user
//   ? { status: { loggedIn: true }, user }
//   : { status: { loggedIn: false }, user: null };

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: user,
        loggedIn: false,
        user: null
    }),
    actions: {
        login(user) {
            return AuthService.login(user).then(
                user => {
                    console.log(user, 'user then');
                    this.loggedIn = true
                    this.user = user

                    return Promise.resolve(user)
                },
                error => {
                    console.log('work error');
                    this.loggedIn = false
                    this.user = null
                    return Promise.reject(error)
                }
            );
        },

        refreshToken(accessToken) {
            this.loggedIn = true
            const test_obj = {...this.user, accessToken:accessToken}
            console.log(test_obj, 'test refresh');
        }
    //    async login(user) {
    //     try {
    //       const res = await AuthService.login(user)

    //       this.user = 'user'
    //       this.loggedIn = true
            
    //     } catch (error) {
    //             this.user = null
    //             this.loggedIn = false
    //             Promise.reject(error)
    //     }  
    //     },

        logout() {
            AuthService.logout()
            this.loggedIn = false
            this.user = null
        }
    },

}) 