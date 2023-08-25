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
import { useNavigate, useParams } from 'react-router-dom';
import {
  ITraining,
  ITrainingUser,
} from '../../../Firebase/trainingModule/trainingModule.types';
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

export function useEditTrainingPage() {
  const { trainingId } = useParams();
  let [formData, setFormData] =
    useState<IAddEditTrainingForm>(defaultFormState);
  const [training, setTraining] = useState<ITraining>();

  let [errors, setErrors] = useState<IAddEditTrainingFormErrors>({});
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  let userProfile = useSelector(getUserProfile);
  let userId = userProfile?.userId;

  useEffect(() => {
    (async function () {
      if (!trainingId) return;
      let trainingResp = await trainingModule.getTrainingById(trainingId, true);

      setFormData({
        title: trainingResp.title,
        description: trainingResp.description,
        trainers: Object.keys(trainingResp.trainers).map((tr) => {
          return {
            id: tr,
            label:
              trainingResp.trainers[tr].profile?.name +
              ' ' +
              trainingResp.trainers[tr].profile?.surname,
            value: trainingResp.trainers[tr].profile?.email ?? '',
          };
        }),
        topic: trainingResp.topic,
        type: trainingResp.type,
        participants: Object.keys(trainingResp.participants).map((tr) => {
          return {
            id: tr,
            label:
              trainingResp.participants[tr].profile?.name +
              ' ' +
              trainingResp.participants[tr].profile?.surname,
            value: trainingResp.participants[tr].profile?.email ?? '',
          };
        }),
        startDate: trainingResp.startDate,
        endDate: trainingResp.endDate,
        location: trainingResp?.location,
      });
      setTraining(trainingResp);
    })();
  }, [setFormData, setTraining, trainingId]);

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
    if (!training) return;
    setIsLoading(true);
    let validation = validateForm(formData);
    if (!validation.isValid) return handleErrors(validation.errors);

    const trainers: { [key: string]: ITrainingUser } = {};
    const participants: { [key: string]: ITrainingUser } = {};

    formData.trainers.forEach((v) => {
      trainers[v.id] = {
        status: training?.trainers[v.id]
          ? training.trainers[v.id].status
          : eTrainingConfirmStatus.Pending,
      };
    });

    formData.participants.forEach((v) => {
      participants[v.id] = {
        status: training?.participants[v.id]
          ? training.participants[v.id].status
          : eTrainingConfirmStatus.Pending,
      };
    });

    await trainingModule.updateTraining(trainingId as string, {
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

    let newTrainers = formData.trainers.filter((e) => !training.trainers[e.id]);
    let newPax = formData.participants.filter(
      (e) => !training.participants[e.id]
    );

    if (newTrainers.length !== 0)
      notificationsModule.sendNotification({
        senderId: userId as string,
        title: 'New training!',
        mainText: `You've been invited to be a trainer at: ${formData.title}!`,
        type: 'invitation',
        trainingId: trainingId as string,
        recipients: Object.keys(newTrainers),
      });

    if (newPax.length !== 0)
      notificationsModule.sendNotification({
        senderId: userId as string,
        title: 'New training!',
        mainText: `You've been invited to participate at: ${formData.title}!`,
        type: 'invitation',
        trainingId: trainingId as string,
        recipients: Object.keys(newPax),
      });

    setIsLoading(false);
    navigate(`/trainings/${trainingId}`);
  };

  return {
    formData,
    handleInputChange,
    training,
    errors,
    isLoading,
    onContinue,
  };
}
