import { AxiosResponse } from "axios";

//schema.prisma.medicaltreatmententity
export class MedicalTreatment {
  user_id: string;
  medicament_ids: string[];
  diagnosis: string;
  diagnosis_date: string;
  treatment_plan: string;
  certificate_url?: string;
  prescription_url?: string;

  constructor(data: AxiosResponse) {
    const responseData = data.data;

    this.user_id = responseData.user_id;
    this.medicament_ids = responseData.medicament_ids;
    this.diagnosis = responseData.diagnosis;
    this.diagnosis_date = responseData.diagnosis_date.toString();
    this.treatment_plan = responseData.treatment_plan;

    if (responseData.certificate_url !== undefined || responseData.certificate_url !== null) {
      this.certificate_url = responseData.certificate_url;
    }
    else {
      this.certificate_url = "";
    }

    if (responseData.prescription_url !== undefined || responseData.prescription_url !== null) {
      this.prescription_url = responseData.prescription_url;
    }
    else {
      this.prescription_url = "";
    }
  }
}