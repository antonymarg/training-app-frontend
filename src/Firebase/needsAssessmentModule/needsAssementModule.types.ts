import { IUserProfile } from '../../Models/User/types';

export interface INAFormResponse {
  motivation: string;
  expectation: string;
}

export interface INAResponse {
  user: IUserProfile;
  response: INAFormResponse;
}
