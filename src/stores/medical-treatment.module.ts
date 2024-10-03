import {defineStore} from "pinia";
import {MedicalTreatment} from "@/types/medical-treatment.model";
import MedicalTreatmentDataService from "@/services/medical-treatment.service";
import {useUserDataStore} from "@/stores/user-data.module";
import {Medicament} from "@/types/medicament.model";
import MedicamentService from "@/services/medicament.service";

export const useMedicalTreatmentStore = defineStore('medical-treatment', {
  state: () => ({
    loading: true,
    treatments: [] as Array<MedicalTreatment>,
    medicaments: [] as Array<Medicament>,
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
        await this.fetchMedicaments();
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
    async fetchMedicaments() {
      try {
        this.medicaments = [];

        for (const treatment of this.treatments) {
          for (const medicamentId of treatment.medicament_ids) {
            const medicament = await MedicamentService.getMedicamentDetails(medicamentId);
            this.medicaments.push(medicament);
          }
        }
        this.errorMessage = '';
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }
    },
    async initStore() {
      const userDataStore= useUserDataStore();

      if (userDataStore.getUserProfile?.user?.user_id) {
        await this.getMedicamentsForUser(userDataStore.getUserProfile.user.user_id);

        if (this.treatments.length > 0 && this.medicaments.length > 0) {
          this.loading = false;
        }
      }
    }
  },
  getters: {
    getMedicalTreatments(state) {
      return state.treatments;
    },
    getMedicaments(state) {
      return state.medicaments;
    },
    getErrorMessage(state) {
      return state.errorMessage;
    }
  }
})