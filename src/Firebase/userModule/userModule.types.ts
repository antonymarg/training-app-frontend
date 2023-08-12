export interface IUserCredentials {
  email: string;
  password: string;
}

export interface ILoginFormErrors {
  emailError?: string;
  passwordError?: string;
  genericError?: string;
}
