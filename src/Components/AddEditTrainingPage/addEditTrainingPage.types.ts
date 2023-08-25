import { Timestamp } from 'firebase/firestore';
import { IUserAutocompleteOptions } from '../AutocompleteUserMultiple/AutocompleteUserMultiple';
import { eTrainingTopics } from '../../lib/enums';

export interface IAddEditTrainingForm {
  title: string;
  description?: string;
  trainers: IUserAutocompleteOptions[];
  topic: keyof typeof eTrainingTopics | '';
  startDate?: Timestamp;
  endDate?: Timestamp;
  type: 'live' | 'online' | '';
  location?: string;
  participants: IUserAutocompleteOptions[];
}

export interface IAddEditTrainingFormErrors {
  genericError?: string;
  titleError?: string;
  cotrainerError?: string;
  topicError?: string;
  startDateError?: string;
  endDateError?: string;
  durationError?: string;
  typeOfTrainingError?: string;
  participants?: string;
}
