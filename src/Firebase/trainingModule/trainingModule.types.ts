import { IUserProfile } from '../../Models/User/types';
import {
  eTrainingConfirmStatus,
  eTrainingTopics,
  eTrainingTypes,
} from '../../lib/enums';

export interface ITrainingOnCreate {
  title: string;
  description?: string;
  creator: string;
  trainers: ITrainingUser[];
  participants: ITrainingUser[];
  startDate: string;
  endDate: string;
  topic: eTrainingTopics;
  type: eTrainingTypes;
  location?: string;
}

export interface ITraining extends ITrainingOnCreate {
  id: string;
}

export interface ITrainingUser {
  userId: string;
  profile?: IUserProfile;
  status: eTrainingConfirmStatus;
}
