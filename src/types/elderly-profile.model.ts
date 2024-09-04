import {User} from "@/types/user.model";

//schema.prisma.elderlyaccountinfo
export class ElderlyProfile {
  phone_number: string;
  address: string;
  city: string;
  date_of_birth: string;
  about_me?: string;
  height: number;
  weight: number;
  emergency_number: string;
  user?: User;

  constructor(data: Partial<ElderlyProfile>, user?: User) {
    this.phone_number = data.phone_number ?? "";
    this.address = data.address ?? "";
    this.city = data.city ?? "";
    this.date_of_birth = data.date_of_birth?.toString() ?? "";
    this.about_me = data.about_me ?? "";
    this.height = data.height ?? 0;
    this.weight = data.weight ?? 0;
    this.emergency_number = data.emergency_number ?? "";
    this.user = user ?? undefined
  }

  // constructor(data: {
  //   phone_number: string;
  //   address: string;
  //   city: string;
  //   date_of_birth: string;
  //   about_me?: string;
  //   height: number;
  //   weight: number;
  //   emergency_number: string;
  // }, user?: User) {
  //   this.phone_number = data.phone_number;
  //   this.address = data.address;
  //   this.city = data.city;
  //   this.date_of_birth = data.date_of_birth.toString();
  //   this.height = data.height;
  //   this.weight = data.weight;
  //   this.emergency_number = data.emergency_number;
  //   this.about_me = data.about_me ?? "";
  //   if (user) {
  //     this.user = user;
  //   }
  // }
}