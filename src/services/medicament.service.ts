import axios from "axios";
import {Medicament} from "@/types/medicament.model";

const API_URL = import.meta.env.VITE_API_URL as string;

class MedicamentDataService {
  async addMedicament(medicamentData: Medicament) {
    const response = await axios.post(`${API_URL}/medicament`, medicamentData);
    return new Medicament(response.data);
  }

  async getMedicamentDetails(medicamentId: string) {
    const response = await axios.get(`${API_URL}/medicament/${medicamentId}`);
    return new Medicament(response.data);
  }

  async getMedicamentsByManufacturer(manufacturerName: string) {
    const response = await axios.get(`${API_URL}/medicament/get/${manufacturerName}`);
    return response.data.map((medicament: any) => new Medicament(medicament));
  }

  async updateMedicament(medicamentId: string, medicamentData: Medicament) {
    const response = await axios.put(`${API_URL}/medicament/${medicamentId}`, medicamentData);
    return new Medicament(response.data);
  }

  async removeMedicament(medicamentId: string) {
    const response = await axios.delete(`${API_URL}/medicament/${medicamentId}`);
    return response.data;
  }
}

export default new MedicamentDataService();