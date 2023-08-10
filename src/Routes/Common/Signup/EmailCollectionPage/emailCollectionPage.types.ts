export interface IEmailCollectionFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IEmailCollectionFormErrors {
  emailError?: string;
  passwordError?: string;
  confirmPasswordError?: string;
  genericError?: string;
}
