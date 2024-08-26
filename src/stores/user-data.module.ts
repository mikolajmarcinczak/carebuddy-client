import {defineStore} from "pinia";
import {ElderlyProfile} from "@/types/elderly-profile.model";
import {CaregiverProfile} from "@/types/caregiver-profile.model";
import {useAuthStore} from "@/stores/auth.module";
import UserDataService from "@/services/user-data.service";

export const useUserDataStore = defineStore('user-data', {
  state: () => ({
    userProfile: null as ElderlyProfile | CaregiverProfile | null,
    errorMessage: ''
  }),
  actions: {
    async fetchUserProfile() {
      const authStore = useAuthStore();
      const user = authStore.user;

      if (!user) {
        this.errorMessage = 'User not logged in';
        return;
      }

      try {
        if (user.role.toLowerCase() === 'elderly') {
          this.userProfile = await UserDataService.getElderlyData(user.email);
        }
        else if (user.role.toLowerCase() === 'caregiver') {
          this.userProfile = await UserDataService.getCaregiverData(user.email);
        }
        this.errorMessage = '';
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }
    },
    async addUserProfile(userProfile: ElderlyProfile | CaregiverProfile) {
      try {
        if (userProfile instanceof ElderlyProfile) {
          await UserDataService.addElderlyData(userProfile);
        }
        else if (userProfile instanceof CaregiverProfile) {
          await UserDataService.addCaregiverData(userProfile);
        }
        this.errorMessage = '';
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
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
        if (userProfile instanceof ElderlyProfile) {
          await UserDataService.updateElderlyData(userProfile.user?.email as string, userProfile);
        }
        else if (userProfile instanceof CaregiverProfile) {
          await UserDataService.updateCaregiverData(userProfile.user?.email as string, userProfile);
        }
        this.errorMessage = '';
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