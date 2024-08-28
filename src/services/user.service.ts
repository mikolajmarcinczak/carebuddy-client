import axios from "axios";
import authHeader from "@/services/auth.header";
import {User} from "@/types/user.model";

const API_URL = import.meta.env.VITE_API_URL as string;

class UserAccessService {
  async getPublic() {
    return axios.get(API_URL + '/all');
  }

  async getUserAccess() {
    return axios.get(API_URL + '/user', { headers: authHeader() });
  }

  async getAdminAccess() {
    return axios.get(API_URL + '/user/admin', { headers: authHeader() });
  }

  async getElderlyAccess() {
    return axios.get(API_URL + '/user/elderly', { headers: authHeader() });
  }

  async getCaregiverAccess() {
    return axios.get(API_URL + '/user/caregiver', { headers: authHeader() });
  }

  async getUsersByRole(role : string) {
    const response = await axios.get(API_URL + `/user/${role}/all`);
    return response.data as User[];
  }
}

export default new UserAccessService();