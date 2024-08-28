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
            return response.data.data;
          }
          else {
            throw new Error(response.data)
          }
        })
        .catch(error => {
          console.log('Error during login:', JSON.stringify(error));
          throw error;
        });
  }

  async logout() {
    return axios
        .post(API_URL + '/auth/logout')
        .then(response => {
          if (response.data.message) {
            console.log(response.data.message);
            return response.data.message;
          }
          return response.data;
        })
        .catch(error => {
          console.error('Error during logout:', error);
        });
  }

  async register(user: User) {
    try {
      const response = await axios.post(API_URL + '/auth/register', user);
      return response.data;
    } catch (error: any) {
      console.error('Error during registration:', error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : error;
    }
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