export interface UserForm{
  userId: number;
  userName: string;
  surname: string;
  email: string;
  password: string;
  profilePicture: File | null;
  type: string;
}
