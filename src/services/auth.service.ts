import axios from "axios";
import {User} from "@/types/user.model";

const API_URL = import.meta.env.VITE_API_URL as string;

class AuthService {
  async login(user: User) {
    return axios
        .post(API_URL + '/auth/login', {
          email: user.email,
          password: user.password
        })
        .then(response => {
          if (response.data.token) {
            response.data.data['accessToken'] = response.data.token
          }
          return response.data.data;
        });
  }

  async logout() {
    localStorage.removeItem('user');
    return axios.post(API_URL + '/auth/logout');
  }

  async register(user: User) {
    return axios.post(API_URL + '/auth/register', {
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role
    });
  }

  async forgotPassword(email: string) {
    return axios.post(API_URL + '/auth/forgotPassword', {
      email: email
    });
  }

  async resetPassword(password: string, token: string) {
    return axios.post(API_URL + `/auth/resetPassword/${token}`, {
      password: password
    });
  }
}

export default new AuthService();