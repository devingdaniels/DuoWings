export interface IUserRegister {
  fname: string;
  lname: string;
  email: string;
  phonenumber: string;
  password: string;
  confirmPassword: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserAuthResponse {
  status: boolean;
  data: { name: string; message: string };
}
