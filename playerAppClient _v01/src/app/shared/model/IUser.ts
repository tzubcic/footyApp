export interface User {
  _id: string;
  username: string;
  email: string;
  isAdmin?: boolean;
  password: string;
  teamName: string;
}
