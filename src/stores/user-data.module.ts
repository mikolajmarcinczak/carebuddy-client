import {defineStore} from "pinia";
import {ElderlyProfile} from "@/types/elderly-profile.model";
import {CaregiverProfile} from "@/types/caregiver-profile.model";
import {useAuthStore} from "@/stores/auth.module";
import UserDataService from "@/services/user-data.service";
import UserAccessService from "@/services/user.service";

export const useUserDataStore = defineStore('user-data', {
  state: () => ({
    userProfile: null as ElderlyProfile | CaregiverProfile | null,
    errorMessage: '',
    proteges: [] as ElderlyProfile[],
    caregivers: [] as CaregiverProfile[]
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
          console.log(userData);
          console.log(this.userProfile);
        }
        else if (String(user.role) === "caregiver") {
          userData = await UserDataService.getCaregiverData(user.email);
          this.userProfile = userData;
          console.log(userData);
          console.log(this.userProfile);
        }

        await authStore.fetchUser();

        this.errorMessage = '';
      } catch (error: any) {
        this.errorMessage = error?.response?.data?.message || 'Failed to fetch user profile';
        console.log(this.errorMessage);
      }
    },
    async addUserProfile(userProfile: ElderlyProfile | CaregiverProfile) {
      const authStore= useAuthStore();
      const user = JSON.parse(JSON.stringify(authStore.user));

      try {
        if (user.role === "elderly") {
          return await UserDataService.addElderlyData(userProfile as ElderlyProfile);
        }
        else if (user.role === "caregiver") {
          return await UserDataService.addCaregiverData(userProfile as CaregiverProfile);
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
        if (user.role === "elderly") {
          return await UserDataService.updateElderlyData(user.email as string, userProfile as ElderlyProfile);
        }
        else if (user.role === "caregiver") {
          return await UserDataService.updateCaregiverData(user.email as string, userProfile as CaregiverProfile);
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
        let userData;
        if (role === "elderly") {
          userData = await UserDataService.getElderlyData(identifier);
          return userData;
        }
        else if (role === "caregiver") {
          userData = await UserDataService.getCaregiverData(identifier);
          return userData;
        }
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
        console.log(this.errorMessage);
      }
    },
    async getSimpleUserById(id: string) {
      try {
        const response = await UserAccessService.getUserById(id);
        return response;
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
        console.log(this.errorMessage);
      }
    },
    async initStore() {
      const authStore = useAuthStore();
      if (authStore.$state.user) {
        await this.fetchUserProfile();
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