import { IUserRole } from '../../../../Models/User/types';

export interface IPersonalDataFormData {
  name: string;
  surname: string;
  role: IUserRole;
}

export interface IPersonalDataFormErrors {
  genericError?: string;
  nameError?: string;
  surnameError?: string;
}
