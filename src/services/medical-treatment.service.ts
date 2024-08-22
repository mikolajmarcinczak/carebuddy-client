import axios from "axios";
import {MedicalTreatment} from "@/types/medical-treatment.model";
import {Medicament} from "@/types/medicament.model";

const API_URL = import.meta.env.VITE_API_URL as string;

class MedicalTreatmentDataService {
  async addMedicalTreatment(medicalTreatmentData: any) {
    const response = await axios.post(`${API_URL}/medical-treatment`, medicalTreatmentData);
    return new MedicalTreatment(response);
  }

  async getTreatmentDetails(treatmentId: string) {
    const response = await axios.get(`${API_URL}/medical-treatment/${treatmentId}`);
    return new MedicalTreatment(response);
  }

  async getMedicamentsForUser(userId: string) {
    const response = await axios.get(`${API_URL}/medical-treatment/get/${userId}`);
    return response.data.map((treatment: any) => new Medicament(treatment));
  }

  async updateMedicalTreatment(treatmentId: string, treatmentData: any) {
    const response = await axios.put(`${API_URL}/medical-treatment/${treatmentId}`, treatmentData);
    return new MedicalTreatment(response);
  }

  async getPrescription(userId: string, treatmentId: string) {
    const response = await axios.get(`${API_URL}/medical-treatment/prescription/${userId}/${treatmentId}`);
    return new MedicalTreatment(response);
  }

  async endMedicalTreatment(treatmentId: string) {
    const response = await axios.delete(`${API_URL}/medical-treatment/${treatmentId}`);
    return response.data;
  }
}

export default new MedicalTreatmentDataService();