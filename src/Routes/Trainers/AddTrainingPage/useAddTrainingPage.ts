import { useState } from 'react';
import {
  IAddTrainingForm,
  IAddTrainingFormErrors,
} from './addTrainingPage.types';
import { IValidateForm } from '../../../lib/types';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../../Models/User/selectors';
import { trainingModule } from '../../../Firebase';
import {
  eTrainingConfirmStatus,
  eTrainingTopics,
  eTrainingTypes,
} from '../../../lib/enums';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const defaultFormState: IAddTrainingForm = {
  title: '',
  trainers: [],
  topic: '',
  type: '',
  participants: [],
};

export function useAddTrainingPage() {
  let [formData, setFormData] = useState<IAddTrainingForm>(defaultFormState);
  let [errors, setErrors] = useState<IAddTrainingFormErrors>({});
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  let userProfile = useSelector(getUserProfile);
  let userId = userProfile?.userId;

  const validateForm = (
    formData: IAddTrainingForm
  ): IValidateForm<IAddTrainingFormErrors> => {
    const requiredFields: Array<keyof IAddTrainingForm> = [
      'title',
      'topic',
      'startDate',
      'endDate',
      'type',
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

  let onContinue = async () => {
    setIsLoading(true);
    let validation = validateForm(formData);
    if (!validation.isValid) return handleErrors(validation.errors);

    await trainingModule.createTraining({
      creator: userId as string,
      title: formData.title as string,
      trainers: formData.trainers.map((v) => ({
        userId: v.id,
        status: eTrainingConfirmStatus.Pending,
      })),
      participants: formData.participants.map((v) => ({
        userId: v.id,
        status: eTrainingConfirmStatus.Pending,
      })),
      description: formData.description,
      startDate: moment(formData.startDate).format(),
      endDate: moment(formData.endDate).format(),
      topic: formData.topic as eTrainingTopics,
      type: formData.type as eTrainingTypes,
      ...(formData.type === 'live' && { location: formData.location }),
    });
    setIsLoading(false);
    navigate('/');
  };

  return { formData, handleInputChange, errors, isLoading, onContinue };
}
