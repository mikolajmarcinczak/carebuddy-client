import {defineStore} from "pinia";
import {MedicalTreatment} from "@/types/medical-treatment.model";
import MedicalTreatmentDataService from "@/services/medical-treatment.service";
import {useUserDataStore} from "@/stores/user-data.module";

export const useMedicalTreatmentStore = defineStore('medical-treatment', {
  state: () => ({
    treatments: [] as Array<MedicalTreatment>,
    errorMessage: ''
  }),
  actions: {
    async addMedicalTreatment(treatmentData: MedicalTreatment) {
      try {
        const treatment = await MedicalTreatmentDataService.addMedicalTreatment(treatmentData);
        this.treatments.push(treatment);
        this.errorMessage = '';
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }
    },
    async getTreatmentDetails(treatmentId: string) {
      try {
        const treatment = await MedicalTreatmentDataService.getTreatmentDetails(treatmentId);
        this.errorMessage = '';
        return treatment;
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }
    },
    async getMedicamentsForUser(userId: string) {
      try {
        const treatments = await MedicalTreatmentDataService.getMedicamentsForUser(userId);
        this.treatments = treatments;
        this.errorMessage = '';
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }
    },
    async updateMedicalTreatment(treatmentId: string, treatmentData: MedicalTreatment) {
      try {
        const updatedTreatment = await MedicalTreatmentDataService.updateMedicalTreatment(treatmentId, treatmentData);
        const index = this.treatments.findIndex(treatment => treatment.id === treatmentId);
        if (index !== -1) {
          this.treatments.splice(index, 1, updatedTreatment);
        }
        this.errorMessage = '';
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }
    },
    async endMedicalTreatment(treatmentId: string) {
      try {
        await MedicalTreatmentDataService.endMedicalTreatment(treatmentId);
        this.treatments = this.treatments.filter(treatment => treatment.id !== treatmentId);
        this.errorMessage = '';
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }
    },
    async getPrescription(userId: string, treatmentId: string) {
      try {
        const prescription = await MedicalTreatmentDataService.getPrescription(userId, treatmentId);
        this.errorMessage = '';
        return prescription;
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }
    },
    async initStore() {
      const userDataStore = useUserDataStore();

      if (userDataStore.getUserProfile?.user?.user_id) {
        await this.getMedicamentsForUser(userDataStore.getUserProfile.user.user_id);
      }
    }
  },
  getters: {
    getMedicalTreatments(state) {
      return state.treatments;
    },
    getErrorMessage(state) {
      return state.errorMessage;
    }
  }
})