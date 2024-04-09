import {AxiosResponse} from "axios";

//schema.prisma.user
export class User {
  username: string;
  password: string;
  role: string;
  email: string;
  image_url: string;

  constructor(data: AxiosResponse) {
    const responseData = data.data;

    this.username = responseData.username;
    this.password = responseData.password;
    this.email = responseData.email;
    this.role = responseData.role;
    this.image_url = responseData.image_url;
  }
}