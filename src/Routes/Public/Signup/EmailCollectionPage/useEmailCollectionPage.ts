import { useState } from 'react';
import { ISignUpFormErrors } from '../../../../Models/User/types';

const defaultFormState = {
  email: '',
  password: '',
  confirmPassword: '',
};
export interface EmailCollectionFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export function useEmailCollection() {
  const [formData, setFormData] =
    useState<EmailCollectionFormData>(defaultFormState);
  const [errors, setErrors] = useState<ISignUpFormErrors>({});
  const [isLoading, setIsLoading] = useState<'credentials' | 'google' | null>(
    null
  );

  const onSignupWithGoogle = () => {
    setIsLoading('google');
    setIsLoading(null);
  };
  const onSignupWithCredentials = () => {
    setIsLoading('credentials');
    setIsLoading(null);
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
