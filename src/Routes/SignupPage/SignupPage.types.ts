import { IUserRole } from '../../Models/User/types';

export type SignUpFormData = {
  email: string;
  password: string;
  name: string;
  role: IUserRole;
};

export type SignUpFormErrors = {
  emailError?: string;
  passwordError?: string;
  nameError?: string;
  genericError?: string;
};
