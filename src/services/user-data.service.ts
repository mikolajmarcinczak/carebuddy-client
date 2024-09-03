import axios from "axios";
import {User} from "@/types/user.model";
import {ElderlyProfile} from "@/types/elderly-profile.model";
import {CaregiverProfile} from "@/types/caregiver-profile.model";

const API_URL = import.meta.env.VITE_API_URL as string;

class UserDataService {
  async getElderlyData(identifier: string) {
    const response = await axios.get(`${API_URL}/user/elderly/?identifier=${identifier}`);
    const user = new User(response.data.data);
    console.log(response.data.data.elderlyaccountinfo)
    return new ElderlyProfile(response.data.data.elderlyaccountinfo, user);
  }

  async addElderlyData(elderlyProfile: ElderlyProfile){
    return await axios.post(`${API_URL}/user/elderly/add`, elderlyProfile);
  }

  async updateElderlyData(identifier: string, elderlyProfile: ElderlyProfile) {
    return await axios.put(`${API_URL}/user/elderly/?identifier=${identifier}`, elderlyProfile);
  }

  async getCaregiverData(identifier: string) {
    const response = await axios.get(`${API_URL}/user/caregiver/?identifier=${identifier}`);
    const user = new User(response.data.data);
    return new CaregiverProfile(response.data.data.caregiveraccountinfo, user);
  }

  async addCaregiverData(caregiverProfile: CaregiverProfile) {
    return await axios.post(`${API_URL}/user/caregiver/add`, caregiverProfile);
  }

  async updateCaregiverData(identifier: string, caregiverProfile: CaregiverProfile) {
    return await axios.put(`${API_URL}/user/caregiver/?identifier=${identifier}`, caregiverProfile);
  }
}

export default new UserDataService();