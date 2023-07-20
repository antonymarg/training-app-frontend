import { eTrainingTopics, eTrainingTypes } from '../../lib/enums';

export interface ITrainingOnCreate {
  title: string;
  description?: string;
  creator: string;
  trainers: string[];
  participants: string[];
  startDate: string;
  endDate: string;
  topic: eTrainingTopics;
  type: eTrainingTypes;
  location?: string;
}

export interface ITraining extends ITrainingOnCreate {
  id: string;
}
