import { useState } from 'react';
import { SignupSteps } from '../SignupPage/SignupPage';
import { userModule } from '../../../../Firebase';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../../../Models/User/selectors';
import {
  ICreateProfileFormData,
  ICreateProfileFormErrors,
} from './createProfilePage.types';
import { IValidateForm } from '../../../../lib/types';
import { AppDispatch } from '../../../../Store';
import { updateUserProfile } from '../../../../Models/User/actions';
import { IUserProfile } from '../../../../Models/User/types';
import userImage from '../../../../Assets/img/user.png';
import { useNavigate } from 'react-router-dom';

const defaultFormState: ICreateProfileFormData = {
  name: '',
  surname: '',
  img: userImage,
  country: '',
  role: 'participant',
  gender: '',
  dateOfBirth: new Date().toISOString().split('T')[0],
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
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { userId, email } = useSelector(getUserProfile);
  const [formData, setFormData] =
    useState<ICreateProfileFormData>(defaultFormState);
  const [errors, setErrors] = useState<ICreateProfileFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (
    formData: ICreateProfileFormData
  ): IValidateForm<ICreateProfileFormErrors> => {
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
  const handleErrors = (errors: ICreateProfileFormErrors) => {
    setIsLoading(false);
    setErrors(errors);
  };

  const onContinue = async () => {
    setIsLoading(true);
    let validation = validateForm(formData);
    if (!validation.isValid) return handleErrors(validation.errors);
    try {
      let newUser: IUserProfile = {
        userId,
        email,
        ...formData,
        dateOfBirth: new Date(formData.dateOfBirth),
      };
      await userModule.createUserProfile(newUser);
      dispatch(updateUserProfile(newUser));
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
