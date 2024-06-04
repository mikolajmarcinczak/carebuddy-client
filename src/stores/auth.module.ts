import AuthService from "@/services/auth.service";
import {defineStore} from "pinia";

const user = JSON.parse(localStorage.getItem('user') as string);
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

export const auth = defineStore({
  id: 'auth',
  state: () => ({...initialState}),
  actions: {
    async login(user: any) {
      return AuthService.login(user).then(
          (user: any) => {
            loginSuccess(this.$state, user)
            return Promise.resolve(user);
          },
          (error: any) => {
            loginFailure(this.$state)
            return Promise.reject(error);
          }
      );
    },
    async logout() {
      await AuthService.logout();
      logout(this.$state)
    },
    async register(user: any) {
      return AuthService.register(user).then(
          (response: any) => {
            registerSuccess(this.$state)
            return Promise.resolve(response.data);
          },
          (error: any) => {
            registerFailure(this.$state)
            return Promise.reject(error);
          }
      );
    },
  }
});

function loginSuccess(state: any, user: any) {
  state.status.loggedIn = true;
  state.user = user;
}
function loginFailure(state: any) {
  state.status.loggedIn = false;
  state.user = null;
}
function logout(state: any) {
  state.status.loggedIn = false;
  state.user = null;
}
function registerSuccess(state: any) {
  state.status.loggedIn = false;
}
function registerFailure(state: any) {
  state.status.loggedIn = false;
}