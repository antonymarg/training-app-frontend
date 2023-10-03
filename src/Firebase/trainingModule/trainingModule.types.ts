import { Timestamp } from 'firebase/firestore';
import { IUserProfile } from '../../Models/User/types';
import {
  eTrainingConfirmStatus,
  eTrainingTopics,
  eTrainingTypes,
  eFeedbackFormStatus,
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
  topic: keyof typeof eTrainingTopics;
  type: eTrainingTypes;
  location?: string;
}
export interface IFollowUpMaterial {
  title: string;
  description: string;
  fileUrl: string;
}

export interface ITraining extends ITrainingOnCreate {
  id: string;
  feedbackFormStatus: eFeedbackFormStatus;
  followUpMaterials: IFollowUpMaterial[];
}

export interface ITrainingUser {
  profile?: IUserProfile;
  status: eTrainingConfirmStatus;
}
