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

  constructor(data: Partial<CaregiverProfile>, user?: User) {
    this.phone_number = data.phone_number ?? "";
    this.city = data.city ?? "";
    this.date_of_birth = data.date_of_birth ?? "";
    this.about_me = data.about_me ?? "";
    this.rating = data.rating ?? 0;
    this.vote_count = data.vote_count ?? 0;
    this.user = user ?? undefined
  }

  // constructor(data: {
  //   phone_number: string;
  //   city: string;
  //   date_of_birth: string;
  //   about_me?: string;
  //   rating?: number;
  //   vote_count?: number;
  // }, user?: User) {
  //   this.phone_number = data.phone_number;
  //   this.city = data.city;
  //   this.date_of_birth = data.date_of_birth.toString();
  //   this.about_me = data.about_me ?? "";
  //   this.rating = data.rating ?? 0;
  //   this.vote_count = data.vote_count ?? 0;
  //   if (user) {
  //     this.user = user;
  //   }
  // }
}