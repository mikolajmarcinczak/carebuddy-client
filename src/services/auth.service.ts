import axios from "axios";
import * as process from "process";
import {User} from "@/types/user.model";

const API_URL = import.meta.env.VUE_APP_API_URL as string;

class AuthService {
  async login(user: User) {
    return axios
        .post(API_URL+ '/login', {
          email: user.email,
          password: user.password
        })
        .then(response => {
          if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }

          return response.data;
        });
  }

  async logout() {
    localStorage.removeItem('user');
  }

  async register(user: User) {
    return axios.post(API_URL + '/register', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();