import { IUserProfile } from '../../Models/User/types';

export interface IFeedbackForm {
  difficulty: number;
  pace: number;
  stickedOut: string;
  improvement: string;
  trainers: string;
}

export interface IFeedbackFormResponse {
  user: IUserProfile;
  response: IFeedbackForm;
}
