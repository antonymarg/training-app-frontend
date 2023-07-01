import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IUserCredentials } from '../../Firebase/userModule/userModule.types';
import { AppDispatch } from '../../Store';
import { useNavigate } from 'react-router-dom';
import { userModule } from '../../Firebase';
import { updateUserLogin, updateUserProfile } from '../../Models/User/actions';
import { IValidateForm } from '../../lib/types';
import { IUseLoginProps, ILoginFormErrors } from './loginModal.types';

const defaultFormState: IUserCredentials = {
  email: '',
  password: '',
};

export function useLogin({ open = false, onClose }: IUseLoginProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<IUserCredentials>(defaultFormState);
  const [errors, setErrors] = useState<ILoginFormErrors>({});
  const [isLoading, setIsLoading] = useState<'credentials' | 'google' | null>(
    null
  );

  const validateForm = (
    formData: IUserCredentials
  ): IValidateForm<ILoginFormErrors> => {
    if (formData.email === '')
      return {
        isValid: false,
        errors: { emailError: 'This is required' },
      };

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      return {
        isValid: false,
        errors: { emailError: 'Please enter a valid email' },
      };
    }
    if (formData.password === '')
      return {
        isValid: false,
        errors: { passwordError: 'This is required' },
      };
    return { isValid: true, errors: {} };
  };

  const onSuccessfulLogin = async (uid: string) => {
    let user = await userModule.getUser(uid);
    dispatch(updateUserLogin());
    dispatch(updateUserProfile(user));
    if (onClose) onClose();
    navigate('/');
  };

  const handleError = (error: { code?: string; message: string }) => {
    setIsLoading(null);
    switch (error.code) {
      case 'auth/invalid-email':
        return { emailError: 'This email is invalid' };
      case 'auth/wrong-password':
        return { passwordError: 'This password is wrong' };
      case undefined:
        return { genericError: error.message };
      default:
        return { genericError: 'A sudden error occurred' };
    }
  };

  useEffect(() => {
    setFormData(defaultFormState);
    setErrors({});
    setIsLoading(null);
  }, [open]);

  const onLoginClick = async () => {
    setErrors({});
    setIsLoading('credentials');
    const validation = validateForm(formData);
    if (validation.isValid) setErrors(validation.errors);
    try {
      let {
        user: { uid },
      } = await userModule.signInWithUserAndEmail(formData);
      if (!uid) throw new Error();
      await onSuccessfulLogin(uid);
    } catch (error: any) {
      setErrors(handleError(error));
    }
    setIsLoading(null);
  };

  const onLoginWithGoogleClick = async () => {
    setIsLoading('google');
    try {
      let {
        user: { email, uid },
      } = await userModule.signInWithGoogle();
      if (!uid || !email) throw new Error();
      let user = await userModule.getUser(uid);
      if (!user) {
        throw new Error("This user doesn't exist. Please create a new account");
      }
      await onSuccessfulLogin(uid);
    } catch (error: any) {
      setErrors(handleError(error));
    }
    setIsLoading(null);
  };

  return {
    errors,
    isLoading,
    formData,
    setFormData,
    onLoginClick,
    onLoginWithGoogleClick,
  };
}
