import { IAutocompleteOptions } from '../../../Components/AutocompleteUser/AutocompleteUser';
import { eTrainingDuration, eTrainingTopics } from '../../../lib/enums';

export interface IAddTrainingForm {
  title: string;
  cotrainer: IAutocompleteOptions | null;
  topic: eTrainingTopics | '';
  dateOfDelivery: string;
  duration: eTrainingDuration | '';
  typeOfTraining: 'live' | 'online' | '';
  location?: string;
  participants: IAutocompleteOptions[];
}

export interface IAddTrainingFormErrors {
  genericError?: string;
  titleError?: string;
  cotrainerError?: string;
  topicError?: string;
  dateOfDeliveryError?: string;
  durationError?: string;
  typeOfTrainingError?: string;
  participants?: string;
}
