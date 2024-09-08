import apiClient from "@/utility/http-common";
import {MedicalTreatment} from "@/types/medical-treatment.model";
import {Medicament} from "@/types/medicament.model";

const axios = apiClient;
const API_URL = import.meta.env.VITE_API_URL as string;

class MedicalTreatmentDataService {
  async addMedicalTreatment(medicalTreatmentData: MedicalTreatment) {
    const response = await axios.post(`${API_URL}/medical-treatment`, medicalTreatmentData);
    return new MedicalTreatment(response.data);
  }

  async getTreatmentDetails(treatmentId: string) {
    const response = await axios.get(`${API_URL}/medical-treatment/${treatmentId}`);
    return new MedicalTreatment(response.data);
  }

  async getMedicamentsForUser(userId: string) {
    const response = await axios.get(`${API_URL}/medical-treatment/get/${userId}`);
    return response.data.map((treatment: any) => new Medicament(treatment));
  }

  async updateMedicalTreatment(treatmentId: string, treatmentData: MedicalTreatment) {
    const response = await axios.put(`${API_URL}/medical-treatment/${treatmentId}`, treatmentData);
    return new MedicalTreatment(response.data);
  }

  async getPrescription(userId: string, treatmentId: string) {
    const response = await axios.get(`${API_URL}/medical-treatment/prescription/${userId}/${treatmentId}`);
    return new MedicalTreatment(response.data);
  }

  async endMedicalTreatment(treatmentId: string) {
    const response = await axios.delete(`${API_URL}/medical-treatment/${treatmentId}`);
    return response.data;
  }
}

export default new MedicalTreatmentDataService();