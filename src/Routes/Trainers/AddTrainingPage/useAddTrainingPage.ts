import { useEffect, useState } from 'react';
import {
  IAddEditTrainingForm,
  IAddEditTrainingFormErrors,
} from '../../../Components/AddEditTrainingPage/addEditTrainingPage.types';
import { IValidateForm } from '../../../lib/types';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../../Models/User/selectors';
import { notificationsModule, trainingModule } from '../../../Firebase';
import {
  eTrainingConfirmStatus,
  eTrainingTopics,
  eTrainingTypes,
} from '../../../lib/enums';
import { useNavigate } from 'react-router-dom';
import { ITrainingUser } from '../../../Firebase/trainingModule/trainingModule.types';
import { Timestamp } from 'firebase/firestore';

const defaultFormState: IAddEditTrainingForm = {
  title: '',
  trainers: [],
  topic: '',
  type: '',
  participants: [],
  startDate: Timestamp.now(),
  endDate: Timestamp.now(),
};

export function useAddTrainingPage() {
  let [formData, setFormData] =
    useState<IAddEditTrainingForm>(defaultFormState);
  let [errors, setErrors] = useState<IAddEditTrainingFormErrors>({});
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  let userProfile = useSelector(getUserProfile);
  let userId = userProfile?.userId;

  useEffect(() => {
    document.title = 'Create new training';
  }, []);
  const validateForm = (
    formData: IAddEditTrainingForm
  ): IValidateForm<IAddEditTrainingFormErrors> => {
    const requiredFields: Array<keyof IAddEditTrainingForm> = [
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
  const handleErrors = (errors: IAddEditTrainingFormErrors) => {
    setIsLoading(false);
    setErrors(errors);
  };

  const handleInputChange = (input: Partial<IAddEditTrainingForm>) =>
    setFormData({ ...formData, ...input });

  let onContinue = async () => {
    setIsLoading(true);
    let validation = validateForm(formData);
    if (!validation.isValid) return handleErrors(validation.errors);

    const trainers: { [key: string]: ITrainingUser } = {};
    const participants: { [key: string]: ITrainingUser } = {};

    formData.trainers.forEach((v) => {
      trainers[v.id] = {
        status: eTrainingConfirmStatus.Pending,
      };
    });

    formData.participants.forEach((v) => {
      participants[v.id] = {
        status: eTrainingConfirmStatus.Pending,
      };
    });

    const trainingResp = await trainingModule.createTraining({
      creator: userId as string,
      title: formData.title as string,
      trainers,
      participants,
      description: formData.description,
      startDate: formData.startDate as Timestamp,
      endDate: formData.endDate as Timestamp,
      topic: formData.topic as keyof typeof eTrainingTopics,
      type: formData.type as eTrainingTypes,
      ...(formData.type === 'live' && { location: formData.location }),
    });

    notificationsModule.sendNotification({
      senderId: userId as string,
      title: 'New training!',
      mainText: `You've been invited to be a trainer at: ${formData.title}!`,
      type: 'invitation',
      trainingId: trainingResp.id,
      recipients: Object.keys(trainers),
    });
    notificationsModule.sendNotification({
      senderId: userId as string,
      title: 'New training!',
      mainText: `You've been invited to participate at: ${formData.title}!`,
      type: 'invitation',
      trainingId: trainingResp.id,
      recipients: Object.keys(participants),
    });
    setIsLoading(false);
    navigate('/');
  };

  return { formData, handleInputChange, errors, isLoading, onContinue };
}
