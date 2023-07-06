export interface IValidateForm<T> {
  isValid: boolean;
  errors: T;
}
