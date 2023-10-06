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
    }),
    actions: {
        login(user) {
            return AuthService.login(user).then(
                user => {
                    this.loggedIn = true
                    this.user = user

                    return Promise.resolve(user)
                },
                error => {
                    this.loggedIn = false
                    this.user = null
                    return Promise.reject(error)
                }
            );
        },

        refreshToken(access) {
            this.user = {...this.user, access:access}
            this.loggedIn = true
        },
        
        logout() {
            AuthService.logout()
            this.loggedIn = false
            this.user = null
        }
    },

}) 