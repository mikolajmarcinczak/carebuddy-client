import { AxiosResponse } from "axios";

//schema.prisma.medicaltreatmententity
export class MedicalTreatment {
  id: string;
  user_id: string;
  medicament_ids: string[];
  diagnosis: string;
  diagnosis_date: string;
  treatment_plan: string;
  certificate_url?: string;
  prescription_url?: string;

  constructor(data: {
    id: string;
    user_id: string;
    medicament_ids: string[];
    diagnosis: string;
    diagnosis_date: string;
    treatment_plan: string;
    certificate_url?: string;
    prescription_url?: string;
  }) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.medicament_ids = data.medicament_ids;
    this.diagnosis = data.diagnosis;
    this.diagnosis_date = data.diagnosis_date.toString();
    this.treatment_plan = data.treatment_plan;
    this.certificate_url = data.certificate_url ?? "";
    this.prescription_url = data.prescription_url ?? "";
  }
}