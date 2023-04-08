import { UserRole } from "../../lib/types";

export type SignUpFormData = {
  email: string;
  password: string;
  name: string;
  role: UserRole;
};

export type SignUpFormErrors = {
  emailError?: string;
  passwordError?: string;
  nameError?: string;
  genericError?: string;
};
