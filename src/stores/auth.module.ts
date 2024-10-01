import AuthService from "@/services/auth.service";
import {defineStore} from "pinia";

let user = sessionStorage.getItem('user');
let initialState = user
    ? { status: { loggedIn: true }, user: JSON.parse(user) }
    : { status: { loggedIn: false }, user: null };

export const useAuthStore = defineStore('auth',{
  state: () => ({
    ...initialState,
    errorMessage: '',
    token: initialState.user?.accessToken,
  }),
  actions: {
    async fetchUser() {
      try {
        const user = await AuthService.getUser(this.$state.user.email);
        const miniUser = {
          email: user.email,
          role: user.role,
          username: user.username,
        };

        loginSuccess(this.$state, miniUser);
        return Promise.resolve(miniUser);
      } catch (error: any) {
        this.$state.errorMessage = error.message || 'Failed to fetch user';
        console.log(this.$state.errorMessage);
        return Promise.reject(error);
      }
    },
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
      try {
        const response = await AuthService.register(user);
        loginSuccess(this.$state, response.data);
        return Promise.resolve(response);
      } catch (error: any) {
        this.errorMessage = error.message || 'Registration failed';
        return Promise.reject(error);
      }
    },
    async initStore() {
      if (JSON.parse(sessionStorage.getItem('user') as string) !== null) {
        this.$state.status.loggedIn = true;
      }
    }
  },
  getters: {
    isAuthenticated: (state: any) => !!state.token,
  }
});

function loginSuccess(state: any, user: any) {
  state.status.loggedIn = true;
  state.user = user;

  if (user.accessToken) {
    state.token = user.accessToken;
  }

  sessionStorage.setItem('user', JSON.stringify(user));
}
function loginFailure(state: any) {
  state.status.loggedIn = false;
  state.user = null;
}
function logout(state: any) {
  state.status.loggedIn = false;
  state.user = null;
  state.token = null;

  sessionStorage.removeItem('user');
}