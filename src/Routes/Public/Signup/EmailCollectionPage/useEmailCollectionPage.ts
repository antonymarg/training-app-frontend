import { useState } from 'react';
import { SignupSteps } from '../SignupPage/SignupPage';
import { userModule } from '../../../../Firebase';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../Store';
import { updateUserProfile } from '../../../../Models/User/actions';
import { IValidateForm } from '../../../../lib/types';
import {
  IEmailCollectionFormData,
  IEmailCollectionFormErrors,
} from './emailCollectionPage.types';

const defaultFormState: IEmailCollectionFormData = {
  email: '',
  password: '',
  confirmPassword: '',
};

const mapErrorCodeToError = (error: {
  code?: string;
  message: string;
}): IEmailCollectionFormErrors => {
  switch (error.code) {
    case 'auth/invalid-email':
      return { emailError: 'This email is invalid' };
    case 'auth/email-already-in-use':
      return { emailError: 'This email already exists' };
    case 'auth/weak-password':
      return { passwordError: 'This password is weak' };
    default:
      return { genericError: 'A sudden error occurred' };
  }
};

export function useEmailCollection(setNextStep: (step: SignupSteps) => void) {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] =
    useState<IEmailCollectionFormData>(defaultFormState);
  const [errors, setErrors] = useState<IEmailCollectionFormErrors>({});
  const [isLoading, setIsLoading] = useState<'credentials' | 'google' | null>(
    null
  );

  const validateForm = (
    formData: IEmailCollectionFormData
  ): IValidateForm<IEmailCollectionFormErrors> => {
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
      return {
        isValid: false,
        errors: { emailError: 'Please enter a valid email' },
      };
    if (formData.password.length < 6)
      return {
        isValid: false,
        errors: {
          passwordError: 'Your password cannot be less than 6 characters long',
        },
      };
    if (formData.confirmPassword !== formData.password)
      return {
        isValid: false,
        errors: {
          confirmPasswordError: `Your passwords don't match`,
        },
      };
    return { isValid: true, errors: {} };
  };

  const handleErrors = (errors: IEmailCollectionFormErrors) => {
    setIsLoading(null);
    setErrors(errors);
  };

  const onSuccessfulSignup = async (userId: string, email: string) => {
    dispatch(updateUserProfile({ userId, email }));
    setIsLoading(null);
    setNextStep('createProfile');
  };

  const onSignupWithCredentials = async () => {
    setIsLoading('credentials');
    let validation = validateForm(formData);
    if (!validation.isValid) return handleErrors(validation.errors);
    try {
      let { user } = await userModule.signUpUserWithEmailAndPassword({
        email: formData.email,
        password: formData.password,
      });
      onSuccessfulSignup(user.uid, formData.email);
    } catch (e: any) {
      return handleErrors(mapErrorCodeToError(e));
    }
  };

  const onSignupWithGoogle = async () => {
    setIsLoading('google');
    try {
      let {
        user: { email, uid },
      } = await userModule.signInWithGoogle();
      if (!uid || !email) throw new Error();
      let user = await userModule.getUser(uid);
      if (user) {
        throw new Error('This user exists');
      }
      onSuccessfulSignup(uid, email);
    } catch (error: any) {
      handleErrors(error);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    isLoading,
    onSignupWithCredentials,
    onSignupWithGoogle,
  };
}
