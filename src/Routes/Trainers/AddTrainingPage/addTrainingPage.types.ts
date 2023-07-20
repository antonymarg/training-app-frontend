import { IUserAutocompleteOptions } from '../../../Components/AutocompleteUser/AutocompleteUser';
import { eTrainingTopics } from '../../../lib/enums';

export interface IAddTrainingForm {
  title: string;
  description?: string;
  trainers: IUserAutocompleteOptions[];
  topic: eTrainingTopics | '';
  startDate?: string;
  endDate?: string;
  type: 'live' | 'online' | '';
  location?: string;
  participants: IUserAutocompleteOptions[];
}

export interface IAddTrainingFormErrors {
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