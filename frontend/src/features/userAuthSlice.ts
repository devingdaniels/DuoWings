interface User {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  phonenumber: string;
  role: "user" | "admin";
}

export interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

const userReducer: UserState = {
  currentUser: null,
  loading: false,
  error: null,
};

export default userReducer;
