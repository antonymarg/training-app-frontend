import { IUserRole } from '../../../../Models/User/types';
import { IGender } from '../../../../Models/User/types';
export interface ICreateProfileFormData {
  name: string;
  surname: string;
  bio?: string;
  country: string;
  gender: IGender | '';
  dateOfBirth: string;
  role: IUserRole;
  img: string;
}

export interface ICreateProfileFormErrors {
  genericError?: string;
  nameError?: string;
  surnameError?: string;
}
