import {defineStore} from "pinia";
import {ElderlyProfile} from "@/types/elderly-profile.model";
import {CaregiverProfile} from "@/types/caregiver-profile.model";
import {useAuthStore} from "@/stores/auth.module";
import UserDataService from "@/services/user-data.service";
import UserAccessService from "@/services/user.service";

export const useUserDataStore = defineStore('user-data', {
  state: () => ({
    userProfile: null as ElderlyProfile | CaregiverProfile | null,
    errorMessage: ''
  }),
  actions: {
    async fetchUserProfile() {
      const authStore= useAuthStore();
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