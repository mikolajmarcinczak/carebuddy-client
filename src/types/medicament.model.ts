import {AxiosResponse} from "axios";

//schema.prisma.medicamententity
export class Medicament {
  id: string;
  name: string;
  dosage: string;
  active_substance: string;
  composition?: string;
  contraindications?: string;
  indications?: string;
  manufacturer?: string;

  constructor(data: AxiosResponse) {
    const responseData = data.data;

    this.id = responseData.id;
    this.name = responseData.name;
    this.dosage = responseData.dosage;
    this.active_substance = responseData.active_substance;

    if (responseData.manufacturer !== undefined || responseData.manufacturer !== null) {
      this.manufacturer = responseData.manufacturer;
    } else {
      this.manufacturer = "";
    }

    if (responseData.composition !== undefined || responseData.composition !== null) {
      this.composition = responseData.composition;
    } else {
      this.composition = "";
    }

    if (responseData.contraindications !== undefined || responseData.contraindications !== null) {
      this.contraindications = responseData.contraindications;
    } else {
      this.contraindications = "";
    }

    if (responseData.indications !== undefined || responseData.indications !== null) {
      this.indications = responseData.indications;
    } else {
      this.indications = "";
    }
  }
}