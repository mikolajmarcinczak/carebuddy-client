import {AxiosResponse} from "axios";
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

  constructor(data: AxiosResponse, user?: User) {
    const responseData = data.data;

    if (user) {
      this.user = user;
    }

    this.phone_number = responseData.phone_number;
    this.address = responseData.address;
    this.city = responseData.city;
    this.date_of_birth = responseData.date_of_birth.toString();
    this.height = responseData.height;
    this.weight = responseData.weight;
    this.emergency_number = responseData.emergency_number;

    if (responseData.about_me !== undefined || responseData.about_me !== null) {
      this.about_me = responseData.about_me;
    }
    else {
      this.about_me = "";
    }
  }

}