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

  constructor(data: {
    id: string;
    name: string;
    dosage: string;
    active_substance: string;
    composition?: string;
    contraindications?: string;
    indications?: string;
    manufacturer?: string;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.dosage = data.dosage;
    this.active_substance = data.active_substance;
    this.composition = data.composition ?? "";
    this.contraindications = data.contraindications ?? "";
    this.indications = data.indications ?? "";
    this.manufacturer = data.manufacturer ?? "";
  }
}