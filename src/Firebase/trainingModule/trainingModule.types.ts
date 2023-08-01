import { Timestamp } from 'firebase/firestore';
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
  trainers: {
    [key: string]: ITrainingUser;
  };
  participants: {
    [key: string]: ITrainingUser;
  };
  startDate: Timestamp;
  endDate: Timestamp;
  topic: eTrainingTopics;
  type: eTrainingTypes;
  location?: string;
}

export interface ITraining extends ITrainingOnCreate {
  id: string;
}

export interface ITrainingUser {
  profile?: IUserProfile;
  status: eTrainingConfirmStatus;
}
