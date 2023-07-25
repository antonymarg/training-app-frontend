import { useState } from 'react';
import {
  IAddTrainingForm,
  IAddTrainingFormErrors,
} from './addTrainingPage.types';
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
import moment from 'moment';
import { ITrainingUser } from '../../../Firebase/trainingModule/trainingModule.types';
import { Timestamp } from 'firebase/firestore';

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
      startDate: moment(formData.startDate).format(),
      endDate: moment(formData.endDate).format(),
      topic: formData.topic as eTrainingTopics,
      type: formData.type as eTrainingTypes,
      ...(formData.type === 'live' && { location: formData.location }),
    });
    formData.trainers.forEach((trainer) =>
      notificationsModule.sendNotification(trainer.id, {
        title: 'New training!',
        mainText: `Welcome to ${formData.title}!`,
        type: 'invitation',
        seen: false,
        sentAt: Timestamp.now(),
        extraInfo: {
          trainingId: trainingResp.id,
        },
      })
    );
    formData.participants.forEach((participant) =>
      notificationsModule.sendNotification(participant.id, {
        title: 'New training for pax!',
        mainText: `Welcome to ${formData.title}!`,
        type: 'invitation',
        seen: false,
        sentAt: Timestamp.now(),
        extraInfo: {
          trainingId: trainingResp.id,
        },
      })
    );
    setIsLoading(false);
    navigate('/');
  };

  return { formData, handleInputChange, errors, isLoading, onContinue };
}
