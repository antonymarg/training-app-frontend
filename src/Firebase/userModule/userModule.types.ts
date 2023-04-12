import { IUserRole } from '../../Models/User/types';

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IUserInfoOnSignUp {
  userId: string;
  email: string;
  name: string;
  role: IUserRole;
}
