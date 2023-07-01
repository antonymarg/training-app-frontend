export interface IUseLoginProps {
  open?: boolean;
  onClose?: () => void;
}

export interface ILoginFormErrors {
  emailError?: string;
  passwordError?: string;
  genericError?: string;
}
