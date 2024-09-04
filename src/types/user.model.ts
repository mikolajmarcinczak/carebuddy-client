
//schema.prisma.user
export class User {
  user_id: string;
  username: string;
  password: string;
  role: string;
  email: string;
  image_url: string;

  constructor(data: Partial<User>) {
    this.user_id = data.user_id ?? "";
    this.username = data.username ?? "";
    this.password = data.password ?? "";
    this.role = data.role ?? "";
    this.email = data.email ?? "";
    this.image_url = data.image_url ?? "";
  }

  // constructor(data: {
  //   user_id: string;
  //   username: string;
  //   password: string;
  //   role: string;
  //   email: string;
  //   image_url: string;
  // }) {
  //   this.user_id = data.user_id;
  //   this.username = data.username;
  //   this.password = data.password;
  //   this.email = data.email;
  //   this.role = data.role;
  //   this.image_url = data.image_url;
  // }
}