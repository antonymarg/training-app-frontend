import { useState } from 'react';
import { SignupSteps } from '../SignupPage/SignupPage';
import { userModule } from '../../../../Firebase';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../../../Models/User/selectors';
import {
  ICreateProfileFormData,
  ICreateProfileFormErrors,
} from './createProfilePage.types';
import { IValidateForm } from '../../../../lib/types';
import { IUserProfile } from '../../../../Models/User/types';
import { useNavigate } from 'react-router-dom';

const defaultFormState: ICreateProfileFormData = {
  name: '',
  surname: '',
  country: '',
  role: 'participant',
  gender: '',
  dateOfBirth: '',
};

const mapErrorCodeToError = (error: {
  code?: string;
  message: string;
}): ICreateProfileFormErrors => {
  switch (error.code) {
    default:
      return { genericError: 'A sudden error occurred' };
  }
};

export function useCreateProfilePage(setNextStep: (step: SignupSteps) => void) {
  const navigate = useNavigate();
  const { userId, email } = useSelector(getUserProfile);
  const [formData, setFormData] =
    useState<ICreateProfileFormData>(defaultFormState);
  const [errors, setErrors] = useState<ICreateProfileFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (
    formData: ICreateProfileFormData
  ): IValidateForm<ICreateProfileFormErrors> => {
    const requiredFields: Array<keyof ICreateProfileFormData> = [
      'name',
      'surname',
      'dateOfBirth',
      'country',
    ];
    if (!userId || !email)
      return {
        isValid: false,
        errors: {
          genericError: `Something happened`,
        },
      };
    for (let field of requiredFields) {
      if (!formData[field]) {
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
  const handleErrors = (errors: ICreateProfileFormErrors) => {
    setIsLoading(false);
    setErrors(errors);
  };

  const onContinue = async () => {
    setIsLoading(true);
    let { img, ...userProfile } = formData;
    let validation = validateForm(formData);
    if (!validation.isValid) return handleErrors(validation.errors);
    try {
      let newUser: IUserProfile = {
        userId,
        email,
        ...userProfile,
      };
      if (img)
        newUser.imgFirebasePath = (
          await userModule.uploadProfilePicture(userId as string, img)
        ).metadata.fullPath;
      await userModule.createUserProfile(newUser);
      navigate('/signup/complete');
      setIsLoading(false);
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
