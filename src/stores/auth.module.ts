import AuthService from "@/services/auth.service";
import {defineStore} from "pinia";

const user = JSON.parse(sessionStorage.getItem('user') as string);
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

export const useAuthStore = defineStore('auth',{
  state: () => ({
    ...initialState,
    errorMessage: ''
  }),
  actions: {
    async login(user: any) {
      await AuthService.login(user).then(
          (user: any) => {
            loginSuccess(this.$state, user);
            this.$state.errorMessage = '';
            console.log(JSON.parse(sessionStorage.getItem('user') as string));
            return Promise.resolve(user);
          })
          .catch((error: any) => {
            loginFailure(this.$state);
            this.$state.errorMessage = error.response.data.message;
            return Promise.reject(error);
          }
      );
    },
    async logout() {
      //logout(this.$state);
      await AuthService.logout().then(
          response => {
            logout(this.$state);
            return Promise.resolve(response);
          },
          (error: any) => {
            return Promise.reject(error);
          }
      );
    },
    async register(user: any) {
      await AuthService.register(user).then(
          (response: any) => {
            registerSuccess(this.$state)
            this.$state.errorMessage = '';
            return Promise.resolve(response.data);
          })
          .catch((error: any) => {
            registerFailure(this.$state)
            this.$state.errorMessage = error.response;
            return Promise.reject(error);
          }
      );
    },
  }
});

function loginSuccess(state: any, user: any) {
  state.status.loggedIn = true;
  state.user = user;

  sessionStorage.setItem('user', JSON.stringify(user));
}
function loginFailure(state: any) {
  state.status.loggedIn = false;
  state.user = null;
}
function logout(state: any) {
  state.status.loggedIn = false;
  state.user = null;

  sessionStorage.removeItem('user');
}
function registerSuccess(state: any) {
  state.status.loggedIn = true;
}
function registerFailure(state: any) {
  state.status.loggedIn = false;
}