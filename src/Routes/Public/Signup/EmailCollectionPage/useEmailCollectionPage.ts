import { useState } from 'react';
import { ISignUpFormErrors } from '../../../../Models/User/types';
import { SignupSteps } from '../SignupPage';
import { userModule } from '../../../../Firebase';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../Store';
import { updateUserUid } from '../../../../Models/User/actions';

export interface EmailCollectionFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const defaultFormState = {
  email: '',
  password: '',
  confirmPassword: '',
};

const mapErrorCodeToError = (error: {
  code?: string;
  message: string;
}): ISignUpFormErrors => {
  console.log(error);
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
    useState<EmailCollectionFormData>(defaultFormState);
  const [errors, setErrors] = useState<ISignUpFormErrors>({});
  const [isLoading, setIsLoading] = useState<'credentials' | 'google' | null>(
    null
  );

  const validateForm = (
    formData: EmailCollectionFormData
  ): { isValid: boolean; errors: ISignUpFormErrors } => {
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

  const handleErrors = (errors: ISignUpFormErrors) => {
    setIsLoading(null);
    setErrors(errors);
  };

  const onSuccessfulSignup = async (uid: string) => {
    dispatch(updateUserUid(uid));
    setIsLoading(null);
    setNextStep('personalData');
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
      onSuccessfulSignup(user.uid);
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
      onSuccessfulSignup(uid);
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
