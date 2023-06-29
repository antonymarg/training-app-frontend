import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startLoginWithEmailThunk,
  startLoginWithGoogleThunk,
} from '../../Models/User/thunks';
import { IUserCredentials } from '../../Firebase/userModule/userModule.types';
import { ILoginFormErrors } from '../../Models/User/types';
import { getUser } from '../../Models/User/selectors';
import { AppDispatch } from '../../Store';
import { useNavigate } from 'react-router-dom';

const defaultFormState = {
  email: '',
  password: '',
};

interface useLoginProps {
  open?: boolean;
  onClose?: () => void;
}

export function useLogin({ open = false, onClose }: useLoginProps) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(getUser);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<IUserCredentials>(defaultFormState);
  const [errors, setErrors] = useState<ILoginFormErrors>({});

  useEffect(() => {
    setFormData(defaultFormState);
    setErrors({});
  }, [open]);

  useEffect(() => {
    if (user.error?.loginError) setErrors(user.error.loginError);
  }, [user.error?.loginError]);

  useEffect(() => {
    if (onClose) onClose();
    navigate('/');
  }, [user.isLoggedIn]);

  const onLoginClick = () => {
    setErrors({});
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      setErrors({ emailError: 'Please enter a valid email' });
      return;
    }
    dispatch(startLoginWithEmailThunk(formData));
  };

  const onLoginWithGoogleClick = () => {
    dispatch(startLoginWithGoogleThunk());
  };

  return {
    errors,
    onLoginClick,
    formData,
    setFormData,
    onLoginWithGoogleClick,
  };
}
