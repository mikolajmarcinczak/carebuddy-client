import {AxiosResponse} from "axios";

//schema.prisma.user
export class User {
  username: string;
  password: string;
  role: string;
  email: string;
  image_url: string;

  constructor(data: {
    username: string;
    password: string;
    role: string;
    email: string;
    image_url: string;
  }) {
    this.username = data.username;
    this.password = data.password;
    this.email = data.email;
    this.role = data.role;
    this.image_url = data.image_url;
  }
}