import {AxiosResponse} from "axios";
import {User} from "@/types/user.model";

//schema.prisma.caregiveraccountinfo
export class CaregiverProfile {
  phone_number: string;
  city: string;
  date_of_birth: string;
  about_me?: string;
  rating?: number;
  vote_count?: number;
  user?: User;

  constructor(data: AxiosResponse, user?: User) {
    const responseData = data.data;

    if (user) {
      this.user = user;
    }

    this.phone_number = responseData.phone_number;
    this.city = responseData.city;
    this.date_of_birth = responseData.date_of_birth.toString();

    if (responseData.about_me !== undefined || responseData.about_me !== null) {
      this.about_me = responseData.about_me;
    }
    else {
      this.about_me = "";
    }

    if (responseData.rating !== undefined || responseData.rating !== null) {
      this.rating = responseData.rating;
    }
    else {
      this.rating = 0;
    }

    if (responseData.vote_count !== undefined || responseData.vote_count !== null) {
      this.vote_count = responseData.vote_count;
    }
    else {
      this.vote_count = 0;
    }
  }
}