import {defineStore} from "pinia";
import {Medicament} from "@/types/medicament.model";
import MedicamentDataService from "@/services/medicament.service";

export const useMedicamentStore = defineStore('medicament', {
  state: () => ({
    loading: true,
    medicaments: [] as Array<Medicament>,
    errorMessage: ''
  }),
  actions: {
    async addMedicament(medicamentData: Medicament) {
      try {
        const medicament = await MedicamentDataService.addMedicament(medicamentData);
        this.medicaments.push(medicament);
        this.errorMessage = '';
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }
    },
    async getMedicamentDetails(medicamentId: string) {
      try {
        const medicament = await MedicamentDataService.getMedicamentDetails(medicamentId);
        this.errorMessage = '';
        return medicament;
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }
    },
    async getMedicamentsByManufacturer(manufacturerName: string) {
      try {
        const medicaments = await MedicamentDataService.getMedicamentsByManufacturer(manufacturerName);
        this.medicaments = medicaments;
        this.errorMessage = '';
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }
    },
    async getAllMedicaments() {
      try {
        const medicaments = await MedicamentDataService.getAllMedicaments();
        this.medicaments = medicaments;
        this.errorMessage = '';
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }
    },
    async updateMedicament(medicamentId: string, medicamentData: Medicament) {
      try {
        const updatedMedicament = await MedicamentDataService.updateMedicament(medicamentId, medicamentData);
        const index = this.medicaments.findIndex(medicament => medicament.id === medicamentId);
        if (index !== -1) {
          this.medicaments.splice(index, 1, updatedMedicament);
        }
        this.errorMessage = '';
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }
    },
    async initStore() {
      await this.getAllMedicaments();

      if (this.medicaments.length > 0) {
        this.$state.loading = false;
      }
    }
  },
  getters: {
    getMedicaments(state) {
      return state.medicaments;
    },
    getErrorMessage(state) {
      return state.errorMessage;
    }
  }
})