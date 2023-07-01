import { useState } from 'react';
import { SignupSteps } from '../SignupPage';
import { userModule } from '../../../../Firebase';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../../../Models/User/selectors';
import {
  IPersonalDataFormData,
  IPersonalDataFormErrors,
} from './personalData.types';
import { IValidateForm } from '../../../../lib/types';
import { AppDispatch } from '../../../../Store';
import { updateUserProfile } from '../../../../Models/User/actions';
import { IUserProfile } from '../../../../Models/User/types';

const defaultFormState: IPersonalDataFormData = {
  name: '',
  surname: '',
  role: 'participant',
};

const mapErrorCodeToError = (error: {
  code?: string;
  message: string;
}): IPersonalDataFormErrors => {
  switch (error.code) {
    default:
      return { genericError: 'A sudden error occurred' };
  }
};

export function usePersonalDataPage(setNextStep: (step: SignupSteps) => void) {
  const dispatch = useDispatch<AppDispatch>();
  const { userId, email } = useSelector(getUserProfile);
  const [formData, setFormData] =
    useState<IPersonalDataFormData>(defaultFormState);
  const [errors, setErrors] = useState<IPersonalDataFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (
    formData: IPersonalDataFormData
  ): IValidateForm<IPersonalDataFormErrors> => {
    if (!formData.name)
      return {
        isValid: false,
        errors: {
          nameError: `This is required.`,
        },
      };
    if (!formData.surname)
      return {
        isValid: false,
        errors: {
          surnameError: `This is required.`,
        },
      };
    if (!userId || !email)
      return {
        isValid: false,
        errors: {
          genericError: `Something happened`,
        },
      };
    return { isValid: true, errors: {} };
  };

  const handleErrors = (errors: IPersonalDataFormErrors) => {
    setIsLoading(false);
    setErrors(errors);
  };

  const onContinue = async () => {
    setIsLoading(true);
    let validation = validateForm(formData);
    if (!validation.isValid) return handleErrors(validation.errors);
    try {
      let newUser: IUserProfile = { userId, email, ...formData };
      await userModule.createUserProfile(newUser);
      dispatch(updateUserProfile(newUser));
      setIsLoading(false);
      if (formData.role === 'participant')
        return setNextStep('participantProfile');
      setNextStep('trainerProfile');
    } catch (e: any) {
      return handleErrors(mapErrorCodeToError(e));
    }
  };

  return {
    formData,
    setFormData,
    errors,
    isLoading,
    onContinue,
  };
}
