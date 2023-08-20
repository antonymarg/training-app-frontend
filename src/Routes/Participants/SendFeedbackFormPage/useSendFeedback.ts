import { useEffect, useState } from 'react';
import { ITraining } from '../../../Firebase/trainingModule/trainingModule.types';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../../Models/User/selectors';
import { trainingModule } from '../../../Firebase';
import { IValidateForm } from '../../../lib/types';
import { useNavigate } from 'react-router-dom';
import { IFeedbackForm } from '../../../Firebase/feedbackModule/feedbackModule.types';
import { feedbackModule } from '../../../Firebase/feedbackModule/feedbackModule';

interface IFeedbackFromErrors {
  difficultyError?: string;
  paceError?: string;
  stickedOutError?: string;
  improvementError?: string;
  trainersError?: string;
}

const defaultFormState = {
  difficulty: 0,
  pace: 0,
  stickedOut: '',
  improvement: '',
  trainers: '',
};

const validateForm = (
  formData: IFeedbackForm
): IValidateForm<IFeedbackFromErrors> => {
  const requiredFields: Array<keyof IFeedbackForm> = [
    'difficulty',
    'pace',
    'stickedOut',
    'improvement',
    'trainers',
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

export function useSendFeedback(trainingId: string) {
  const profile = useSelector(getUserProfile);
  const userId = profile?.userId as string;
  const [isLoading, setIsLoading] = useState(true);
  const [training, setTraining] = useState<ITraining>();

  const [formData, setFormData] = useState<IFeedbackForm>(defaultFormState);
  const [errors, setErrors] = useState<IFeedbackFromErrors>({});
  const navigate = useNavigate();

  const handleErrors = (errors: IFeedbackFromErrors) => {
    setIsLoading(false);
    setErrors(errors);
  };

  const handleInputChange = (input: Partial<IFeedbackForm>) =>
    setFormData({ ...formData, ...input });

  const onSubmit = async () => {
    setIsLoading(true);
    let validation = validateForm(formData);
    if (!validation.isValid) return handleErrors(validation.errors);
    await feedbackModule.sendFeedbackForm(trainingId, userId, formData);
    setIsLoading(false);
    navigate(`/trainings/${trainingId}`);
  };

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      if (!trainingId) return;
      let trainingResp = await trainingModule.getTrainingById(trainingId, true);
      setTraining({ ...trainingResp, id: trainingId });
      setIsLoading(false);
    })();
  }, [trainingId, userId]);

  return { training, isLoading, errors, formData, handleInputChange, onSubmit };
}
