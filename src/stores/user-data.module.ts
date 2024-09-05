import {defineStore} from "pinia";
import {ElderlyProfile} from "@/types/elderly-profile.model";
import {CaregiverProfile} from "@/types/caregiver-profile.model";
import {useAuthStore} from "@/stores/auth.module";
import UserDataService from "@/services/user-data.service";
import UserAccessService from "@/services/user.service";

const authStore= useAuthStore();

export const useUserDataStore = defineStore('user-data', {
  state: () => ({
    userProfile: null as ElderlyProfile | CaregiverProfile | null,
    errorMessage: '',
    proteges: [] as ElderlyProfile[],
    caregivers: [] as CaregiverProfile[]
  }),
  actions: {
    async fetchUserProfile() {
      const user = JSON.parse(JSON.stringify(authStore.user));
      console.log(user);
      console.log(user.role);

      if (!user) {
        this.errorMessage = 'User not logged in';
        return;
      }

      try {
        let userData;
        if (String(user.role) === "elderly") {
          userData = await UserDataService.getElderlyData(user.email);
          this.userProfile = userData;
        }
        else if (String(user.role) === "caregiver") {
          userData = await UserDataService.getCaregiverData(user.email);
          this.userProfile = userData;
          console.log(userData);
          console.log(this.userProfile);
        }
        this.errorMessage = '';
      } catch (error: any) {
        this.errorMessage = error?.response?.data?.message || 'Failed to fetch user profile';
      }
    },
    async addUserProfile(userProfile: ElderlyProfile | CaregiverProfile) {
      try {
        if (userProfile.user?.role === "elderly") {
          await UserDataService.addElderlyData(userProfile as ElderlyProfile);
        }
        else if (userProfile.user?.role === "caregiver") {
          await UserDataService.addCaregiverData(userProfile as CaregiverProfile);
        }
        await this.fetchUserProfile();
        this.errorMessage = '';
      } catch (error: any) {
        this.errorMessage = error?.response?.data?.message || 'Failed to create user profile';
      }
    },
    async updateUserProfile(userProfile: ElderlyProfile | CaregiverProfile) {
      const authStore= useAuthStore();
      const user = authStore.user;

      if (!user) {
        this.errorMessage = 'User not logged in';
        return;
      }

      try {
        if (userProfile.user?.role === "elderly") {
          await UserDataService.updateElderlyData(userProfile.user?.email as string, userProfile as ElderlyProfile);
        }
        else if (userProfile.user?.role === "caregiver") {
          await UserDataService.updateCaregiverData(userProfile.user?.email as string, userProfile as CaregiverProfile);
        }
        this.errorMessage = '';
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }
    },
    async getUsersByRole(role: string) {
      try {
        if (role === "" || role === undefined || role === null) {
          role = "0000";
        }

        const users = await UserAccessService.getUsersByRole(role);
        return users;
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }
    },
    async fetchProteges() {
      const caregiverId = this.userProfile?.user?.user_id;

      if (!caregiverId) {
        this.errorMessage = 'Caregiver not found';
        return;
      }

      try {
        const proteges = await UserDataService.getProteges(caregiverId);
        this.proteges = proteges;
        this.errorMessage = '';
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }

      return this.proteges;
    },
    async fetchCaregivers(){
      const elderlyId = this.userProfile?.user?.user_id;

      if (!elderlyId) {
        this.errorMessage = 'Elderly not found';
        return;
      }

      try {
        const caregivers = await UserDataService.getCaregivers(elderlyId);
        this.caregivers = caregivers;
        this.errorMessage = '';
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }

      return this.caregivers;
    },
    async assignCare(elderly: string, documentUrl: string) {
      const caregiverId = this.userProfile?.user?.user_id;

      if (!caregiverId) {
        this.errorMessage = 'Caregiver not found';
        return;
      }

      try {
        await UserDataService.assignCare(elderly, caregiverId, documentUrl);
        this.errorMessage = '';
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }
    },
    async unassignCare(elderly: string) {
      const caregiverId = this.userProfile?.user?.user_id;

      if (!caregiverId) {
        this.errorMessage = 'Caregiver not found';
        return;
      }

      try {
        await UserDataService.unassignCare(elderly, caregiverId);
        this.errorMessage = '';
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }
    },
    async getUserData(identifier: string, role: string) {
      try {
        if (role === "elderly") {
          return await UserDataService.getElderlyData(identifier);
        }
        else if (role === "caregiver") {
          return await UserDataService.getCaregiverData(identifier);
        }
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }

    }
  },
  getters: {
    getUserProfile(state) {
      return state.userProfile;
    },
    getErrorMessage(state) {
      return state.errorMessage;
    }
  }
});