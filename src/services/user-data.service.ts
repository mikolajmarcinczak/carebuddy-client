import apiClient from "@/utility/http-common";
import {User} from "@/types/user.model";
import {ElderlyProfile} from "@/types/elderly-profile.model";
import {CaregiverProfile} from "@/types/caregiver-profile.model";

const axios = apiClient;
const API_URL = import.meta.env.VITE_API_URL as string;

class UserDataService {
  async getElderlyData(identifier: string) {
    const response= await axios.get(`${API_URL}/user/elderly/?identifier=${identifier}`);
    const user = new User(response.data.data);
    if (response.data.data.elderlyaccountinfo) {
      return new ElderlyProfile(response.data.data.elderlyaccountinfo, user);
    } else {
      return null;
    }
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
    if (response.data.data.caregiveraccountinfo) {
      return new CaregiverProfile(response.data.data.caregiveraccountinfo, user);
    } else {
      return null;
    }
  }

  async addCaregiverData(caregiverProfile: CaregiverProfile) {
    return await axios.post(`${API_URL}/user/caregiver/add`, caregiverProfile);
  }

  async updateCaregiverData(identifier: string, caregiverProfile: CaregiverProfile) {
    return await axios.put(`${API_URL}/user/caregiver/?identifier=${identifier}`, caregiverProfile);
  }

  async assignCare(elderly: string, caregiver: string, documentUrl: string) {
    return await axios.post(`${API_URL}/aoc-document/assign-care`, {data: {elderly, caregiver, documentUrl}});
  }

  async unassignCare(elderly: string, caregiver: string) {
    return await axios.delete(`${API_URL}/aoc-document/unassign-care`, {data: {elderly, caregiver}});
  }

  async getAuthorizationDocument(elderly: string, caregiver: string) {
    return await axios.get(`${API_URL}/aoc-document/get-document`, {data: {elderly, caregiver}});
  }

  async getProteges(caregiver: string) {
    const response = await axios.get(`${API_URL}/aoc-document/proteges/${caregiver}`);
    return response.data.data.map((user: any) => {
      const userObj = new User(user);
      return new ElderlyProfile(user.elderlyaccountinfo, userObj);
    }) as ElderlyProfile[];
  }

  async getCaregivers(elderly: string) {
    const response = await axios.get(`${API_URL}/aoc-document/caregivers/${elderly}`);
    return response.data.data.map((user: any) => {
      const userObj = new User(user);
      const profile = new CaregiverProfile(user.caregiveraccountinfo, userObj)
      console.log("service: ", profile)
      return profile;
    }) as CaregiverProfile[];
  }
}

export default new UserDataService();