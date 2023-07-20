import { useState } from 'react';
import {
  IAddTrainingForm,
  IAddTrainingFormErrors,
} from './addTrainingPage.types';
import { IValidateForm } from '../../../lib/types';

const defaultFormState: IAddTrainingForm = {
  title: '',
  cotrainer: null,
  dateOfDelivery: '',
  topic: '',
  duration: '',
  typeOfTraining: '',
  participants: [],
};

export function useAddTrainingPage() {
  let [formData, setFormData] = useState<IAddTrainingForm>(defaultFormState);
  let [errors, setErrors] = useState<IAddTrainingFormErrors>({});
  let [isLoading, setIsLoading] = useState(false);

  const validateForm = (
    formData: IAddTrainingForm
  ): IValidateForm<IAddTrainingFormErrors> => {
    const requiredFields: Array<keyof IAddTrainingForm> = [
      'title',
      'topic',
      'dateOfDelivery',
      'duration',
      'typeOfTraining',
    ];
    for (let field of requiredFields) {
      if (!Boolean(formData[field])) {
        return {
          isValid: false,
          errors: {
            [field + 'Error']: 'Required',
          },
        };
      }
    }
    return { isValid: true, errors: {} };
  };
  const handleErrors = (errors: IAddTrainingFormErrors) => {
    setIsLoading(false);
    setErrors(errors);
  };

  const handleInputChange = (input: Partial<IAddTrainingForm>) =>
    setFormData({ ...formData, ...input });

  let onContinue = () => {
    setIsLoading(true);
    console.log(formData);
    let validation = validateForm(formData);
    console.log(validation.errors);
    if (!validation.isValid) return handleErrors(validation.errors);
  };
  return { formData, handleInputChange, errors, isLoading, onContinue };
}
